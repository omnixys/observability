import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from "@nestjs/common";
import { trace } from "@opentelemetry/api";
import { type Observable, tap } from "rxjs";
import { SpanEnricher } from "./span-enricher.js";
import { SpanNaming } from "./span-naming.util.js";

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== "http") {
      return next.handle();
    }

    const tracer = trace.getTracer("http");

    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();

    const route = req.route?.path ?? req.url;

    return tracer.startActiveSpan(SpanNaming.http(req.method, route), (span) => {
      return next.handle().pipe(
        tap({
          next: () => {
            span.setAttribute("http.status_code", res.statusCode);
            SpanEnricher.enrich(span);
            span.end();
          },
          error: (err) => {
            span.recordException(err);
            SpanEnricher.enrich(span);
            span.end();
          },
        }),
      );
    });
  }
}
