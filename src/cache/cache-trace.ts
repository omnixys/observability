import { runWithCanonicalTrace } from '../context/canonical-trace-context.js';
import { SpanEnricher } from '../tracing/span-enricher.js';
import { SpanKind, SpanStatusCode, trace, type Span } from '@opentelemetry/api';

export class CacheTrace {
  static async publish<T>(
    channel: string,
    fn: (span: Span | undefined) => Promise<T>,
  ): Promise<T> {
    const tracer = trace.getTracer('omnixys.cache.pubsub');

    return tracer.startActiveSpan(
      `valkey.publish ${channel}`,
      { kind: SpanKind.PRODUCER },
      async (span) => {
        try {
          SpanEnricher.enrich(span);
          const result = await runWithCanonicalTrace(span, () => fn(span));
          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (error) {
          span.recordException(error as Error);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: (error as Error).message,
          });
          throw error;
        } finally {
          span.end();
        }
      },
    );
  }

  static async subscribe<T>(
    channel: string,
    fn: (span: Span | undefined) => Promise<T>,
  ): Promise<T> {
    const tracer = trace.getTracer('omnixys.cache.pubsub');

    return tracer.startActiveSpan(
      `valkey.subscribe ${channel}`,
      { kind: SpanKind.CONSUMER },
      async (span) => {
        try {
          SpanEnricher.enrich(span);
          const result = await runWithCanonicalTrace(span, () => fn(span));
          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (error) {
          span.recordException(error as Error);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: (error as Error).message,
          });
          throw error;
        } finally {
          span.end();
        }
      },
    );
  }
}
