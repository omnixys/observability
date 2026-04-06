import { SpanNaming } from '../tracing/span-naming.util.js';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
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

    span.updateName(SpanNaming.graphql(info.parentType.name, info.fieldName));

    span.setAttribute('graphql.field', info.fieldName);
    span.setAttribute('graphql.type', info.parentType.name);

    return next.handle().pipe(
      tap({
        error: (err) => span.recordException(err),
      }),
    );
  }
}
