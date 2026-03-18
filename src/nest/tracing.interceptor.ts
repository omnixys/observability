import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { Observable, tap } from "rxjs";
import { OmnixysLogger } from "../logger/logger.js";

const { traceId, spanId } = getTraceContext();
  
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: OmnixysLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== "http") {
      return next.handle();
    }

    const http = context.switchToHttp();

    const request = http.getRequest();
    const response = http.getResponse();

    const method = request.method;
    const url = request.originalUrl ?? request.url;

    const log = this.logger.child("http.request");

    const start = Date.now();

    log.info("Incoming request", {
      method,
      url,
    });

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;

          log.info("Request completed", {
            method,
            url,
            statusCode: response.statusCode,
            duration,
          });
        },
        error: (err) => {
          const duration = Date.now() - start;

          log.error("Request failed", {
            method,
            url,
            statusCode: response.statusCode,
            duration,
            error: err?.message,
          });
        },
      }),
    );
  }
}
