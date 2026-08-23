import { runWithCanonicalTrace } from '../context/canonical-trace-context.js';
import { SpanNaming } from '../tracing/span-naming.util.js';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ContextAccessor } from '@omnixys/context-ts';
import { SpanStatusCode, trace, type Span } from '@opentelemetry/api';
import { Observable, finalize, tap } from 'rxjs';

@Injectable()
export class GraphQLInterceptor implements NestInterceptor {
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
                  error: (err) => recordGraphQLError(err, span, info.fieldName),
                }),
                finalize(() => {
                  if (owned) span.end();
                }),
              )
              .subscribe(subscriber);
          } catch (err) {
            recordGraphQLError(err, span, info.fieldName);
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
): void {
  attachTraceContext(error, span, operation);
  span.recordException(error as Error);
  span.setStatus({
    code: SpanStatusCode.ERROR,
    message: error instanceof Error ? error.message : String(error),
  });
}
