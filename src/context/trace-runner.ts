import { SpanEnricher } from '../tracing/span-enricher.js';
import { runWithCanonicalTrace } from './canonical-trace-context.js';
import { context, trace, SpanStatusCode, SpanKind } from '@opentelemetry/api';

export class TraceRunner {
  static async run<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const tracer = trace.getTracer('omnixys');

    return tracer.startActiveSpan(
      name,
      { kind: SpanKind.INTERNAL },
      async (span) => {
        SpanEnricher.enrich(span);
        try {
          return await runWithCanonicalTrace(span, fn);
        } catch (err) {
          span.recordException(err as Error);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: (err as Error).message,
          });
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }
}
