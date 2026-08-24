import { runWithCanonicalTrace } from '../context/canonical-trace-context.js';
import {
  OMNIXYS_LOGGER,
  type PlatformTraceLogger,
} from '../logging/platform-logger.token.js';
import { SpanEnricher } from './span-enricher.js';
import { SpanNaming } from './span-naming.util.js';
import {
  type CallHandler,
  type ExecutionContext,
  Inject,
  Injectable,
  type NestInterceptor,
  Optional,
} from '@nestjs/common';
import { SpanStatusCode, trace } from '@opentelemetry/api';
import { finalize, Observable, tap } from 'rxjs';

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  private readonly log;

  constructor(
    @Optional()
    @Inject(OMNIXYS_LOGGER)
    private readonly logger?: PlatformTraceLogger,
  ) {
    this.log = this.logger?.log(this.constructor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return next.handle();

    const tracer = trace.getTracer('http');
    const http = context.switchToHttp();
    const request = http.getRequest();
    const response = http.getResponse();
    const route = request.route?.path ?? request.url;

    // Create and subscribe to the handler observable inside both the OTel and
    // canonical context scopes. This preserves both across async emissions.
    return new Observable((subscriber) =>
      tracer.startActiveSpan(SpanNaming.http(request.method, route), (span) => {
        SpanEnricher.enrich(span);

        return runWithCanonicalTrace(span, () => {
          try {
            return next
              .handle()
              .pipe(
                tap({
                  error: (error) => {
                    this.log?.error('HTTP request failed', {
                      error,
                      method: request.method,
                      route,
                    });
                    span.recordException(error);
                    span.setStatus({
                      code: SpanStatusCode.ERROR,
                      message:
                        error instanceof Error ? error.message : String(error),
                    });
                  },
                }),
                finalize(() => {
                  span.setAttribute('http.status_code', response.statusCode);
                  SpanEnricher.enrich(span);
                  span.end();
                }),
              )
              .subscribe(subscriber);
          } catch (error) {
            this.log?.error('HTTP request failed before handler execution', {
              error,
              method: request.method,
              route,
            });
            span.recordException(error as Error);
            span.setStatus({ code: SpanStatusCode.ERROR });
            SpanEnricher.enrich(span);
            span.end();
            subscriber.error(error);
          }
        });
      }),
    );
  }
}
