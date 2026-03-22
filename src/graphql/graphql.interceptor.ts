import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { trace } from "@opentelemetry/api";
import { type Observable, tap } from "rxjs";
import { SpanNaming } from "../tracing/span-naming.util.js";

@Injectable()
export class GraphQLInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<"graphql">() !== "graphql") {
      return next.handle();
    }

    const gql = GqlExecutionContext.create(context);
    const info = gql.getInfo();

    const tracer = trace.getTracer("graphql");

    const spanName = SpanNaming.graphql(info.parentType.name, info.fieldName);

    return tracer.startActiveSpan(spanName, (span) => {
      span.setAttribute("graphql.field", info.fieldName);
      span.setAttribute("graphql.type", info.parentType.name);

      return next.handle().pipe(
        tap({
          next: () => span.end(),
          error: (err) => {
            span.recordException(err);
            span.end();
          },
        }),
      );
    });
  }
}
