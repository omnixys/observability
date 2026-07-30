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
import { trace } from '@opentelemetry/api';
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
              error: (err) => span.recordException(err),
            }),
          )
          .subscribe(subscriber),
      ),
    );
  }
}
