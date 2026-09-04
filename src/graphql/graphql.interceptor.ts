import { runWithCanonicalTrace } from '../context/canonical-trace-context.js';
import {
  OMNIXYS_LOGGER,
  type PlatformScopedErrorLogger,
  type PlatformTraceLogger,
} from '../logging/platform-logger.token.js';
import { SpanNaming } from '../tracing/span-naming.util.js';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Optional,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ContextAccessor } from '@omnixys/context-ts';
import { SpanStatusCode, trace, type Span } from '@opentelemetry/api';
import { Observable, finalize, tap } from 'rxjs';

@Injectable()
export class GraphQLInterceptor implements NestInterceptor {
  private readonly log;

  constructor(
    @Optional()
    @Inject(OMNIXYS_LOGGER)
    private readonly logger?: PlatformTraceLogger,
  ) {
    this.log = this.logger?.log(this.constructor.name, 'package:@omnixys/observability-ts');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<'graphql'>() !== 'graphql') {
      return next.handle();
    }

    const gql = GqlExecutionContext.create(context);
    const info = gql.getInfo();
    if (ContextAccessor.isActive()) {
      ContextAccessor.update({ operation: info.fieldName });
    }

    const activeSpan = trace.getActiveSpan();
    const execute = (span: Span, owned: boolean) => {
      span.updateName(SpanNaming.graphql(info.parentType.name, info.fieldName));
      span.setAttribute('graphql.field', info.fieldName);
      span.setAttribute('graphql.type', info.parentType.name);

      return new Observable((subscriber) =>
        runWithCanonicalTrace(span, () => {
          try {
            next
              .handle()
              .pipe(
                tap({
                  error: (err) =>
                    recordGraphQLError(err, span, info.fieldName, this.log),
                }),
                finalize(() => {
                  if (owned) span.end();
                }),
              )
              .subscribe(subscriber);
          } catch (err) {
            recordGraphQLError(err, span, info.fieldName, this.log);
            if (owned) span.end();
            subscriber.error(err);
          }
        }),
      );
    };

    if (activeSpan) return execute(activeSpan, false);

    const tracer = trace.getTracer('graphql');
    return new Observable((subscriber) =>
      tracer.startActiveSpan(
        SpanNaming.graphql(info.parentType.name, info.fieldName),
        (span) => execute(span, true).subscribe(subscriber),
      ),
    );
  }
}

/**
 * GraphQL formats errors after a resolver's async scope has completed. Keep the
 * active trace identifiers on the thrown object so the formatter and logger can
 * retain the real trace without inventing one from request metadata.
 */
export function attachTraceContext(
  error: unknown,
  span: Span,
  operation: string,
): void {
  if (!error || typeof error !== 'object') return;

  const { traceId, spanId } = span.spanContext();
  const target = error as {
    traceId?: unknown;
    spanId?: unknown;
    operation?: unknown;
  };
  if (typeof target.traceId !== 'string' || target.traceId.length === 0) {
    target.traceId = traceId;
  }
  if (typeof target.spanId !== 'string' || target.spanId.length === 0) {
    target.spanId = spanId;
  }
  if (typeof target.operation !== 'string' || target.operation.length === 0) {
    target.operation = operation;
  }
}

function recordGraphQLError(
  error: unknown,
  span: Span,
  operation: string,
  log?: PlatformScopedErrorLogger,
): void {
  attachTraceContext(error, span, operation);
  log?.error('GraphQL operation failed', { error, operation });
  span.recordException(error as Error);
  span.setStatus({
    code: SpanStatusCode.ERROR,
    message: error instanceof Error ? error.message : String(error),
  });
}
