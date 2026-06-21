import { HeaderCarrier } from '../propagation/header-carrier.interface.js';
import { W3CPropagator } from '../propagation/w3c-propagator.js';
import { SpanEnricher } from '../tracing/span-enricher.js';
import { runWithCanonicalTrace } from './canonical-trace-context.js';
import {
  type Context,
  SpanKind,
  SpanStatusCode,
  trace,
} from '@opentelemetry/api';

export class TraceContextRunner {
  static async run<T>(
    name: string,
    carrier: HeaderCarrier,
    fn: (extractedCtx: Context) => Promise<T>,
  ): Promise<T> {
    const propagator = new W3CPropagator();
    const extractedCtx = propagator.extract(carrier);
    const tracer = trace.getTracer('omnixys');

    return tracer.startActiveSpan(
      name,
      { kind: SpanKind.CONSUMER },
      extractedCtx,
      async (span) => {
        SpanEnricher.enrich(span);

        try {
          return await runWithCanonicalTrace(span, () => fn(extractedCtx));
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
