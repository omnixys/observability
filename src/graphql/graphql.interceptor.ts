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
import { trace, type Span } from '@opentelemetry/api';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GraphQLInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<'graphql'>() !== 'graphql') {
      return next.handle();
    }

    const span = trace.getActiveSpan();
    if (!span) return next.handle();

    const gql = GqlExecutionContext.create(context);
    const info = gql.getInfo();
    if (ContextAccessor.isActive()) {
      ContextAccessor.update({ operation: info.fieldName });
    }

    span.updateName(SpanNaming.graphql(info.parentType.name, info.fieldName));

    span.setAttribute('graphql.field', info.fieldName);
    span.setAttribute('graphql.type', info.parentType.name);

    return new Observable((subscriber) =>
      runWithCanonicalTrace(span, () =>
        next
          .handle()
          .pipe(
            tap({
              error: (err) => {
                attachTraceContext(err, span);
                span.recordException(err);
              },
            }),
          )
          .subscribe(subscriber),
      ),
    );
  }
}

/**
 * GraphQL formats errors after a resolver's async scope has completed. Keep the
 * active trace identifiers on the thrown object so the formatter and logger can
 * retain the real trace without inventing one from request metadata.
 */
function attachTraceContext(error: unknown, span: Span): void {
  if (!error || typeof error !== 'object') return;

  const { traceId, spanId } = span.spanContext();
  const target = error as { traceId?: unknown; spanId?: unknown };
  if (typeof target.traceId !== 'string' || target.traceId.length === 0) {
    target.traceId = traceId;
  }
  if (typeof target.spanId !== 'string' || target.spanId.length === 0) {
    target.spanId = spanId;
  }
}
