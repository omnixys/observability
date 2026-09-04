import { runWithCanonicalTrace } from '../context/canonical-trace-context.js';
import { OMNIXYS_LOGGER, type PlatformTraceLogger } from '../logging/platform-logger.token.js';
import { SpanEnricher } from '../tracing/span-enricher.js';
import { CacheMetricsService } from './cache-metrics.service.js';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { SpanStatusCode, trace, type Span, type SpanKind } from '@opentelemetry/api';

@Injectable()
export class CacheObservabilityService {
  private readonly log;

  constructor(
    private readonly metrics: CacheMetricsService,
    @Optional()
    @Inject(OMNIXYS_LOGGER)
    private readonly logger?: PlatformTraceLogger,
  ) {
    this.log = this.logger?.log(this.constructor.name, 'package:@omnixys/observability-ts');
  }

  async trace<T>(
    operation: string,
    key: string,
    fn: (span: Span | undefined) => Promise<T>,
  ): Promise<T> {
    const tracer = trace.getTracer('omnixys.cache');

    return tracer.startActiveSpan(`cache.${operation}`, async (span) => {
      span.setAttribute('cache.operation', operation);
      span.setAttribute('cache.key', key);
      SpanEnricher.enrich(span);

      try {
        const result = await runWithCanonicalTrace(span, () => fn(span));

        if (operation === 'set') {
          this.metrics.write();
        }

        if (operation === 'delete') {
          this.metrics.delete();
        }

        span.setStatus({ code: SpanStatusCode.OK });
        return result;
      } catch (error) {
        this.log?.error('Cache operation failed', { error, operation, key });
        this.metrics.error();
        span.recordException(error as Error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: (error as Error).message,
        });
        throw error;
      } finally {
        span.end();
      }
    });
  }
}
