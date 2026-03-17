import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { Observable } from "rxjs";
import { trace } from "@opentelemetry/api";
import { tap } from "rxjs/operators";

@Injectable()
export class TraceInterceptor implements NestInterceptor {


intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  const tracer = trace.getTracer("http");

  return tracer.startActiveSpan("request", (span) => {
    return next.handle().pipe(
      tap({
        next: () => {
          span.end();
        },
        error: (err) => {
          span.recordException(err);
          span.setStatus({
            code: 2, // ERROR
            message: err.message,
          });
          span.end();
        },
      }),
    );
  });
}
}
