import { HeaderCarrier } from '../propagation/header-carrier.interface.js';
import { W3CPropagator } from '../propagation/w3c-propagator.js';
import {
  context,
  trace,
  SpanKind,
  SpanStatusCode,
  Context,
} from '@opentelemetry/api';

export class TraceContextRunner {
  static async run<T>(
    name: string,
    carrier: HeaderCarrier,
    fn: (extractedCtx: Context) => Promise<T>,
  ): Promise<T> {
    const propagator = new W3CPropagator();

    const extractedCtx = propagator.extract(carrier);

    return context.with(extractedCtx, async () => {
      const tracer = trace.getTracer('omnixys');

      const span = tracer.startSpan(name, {
        kind: SpanKind.CONSUMER,
      });

      try {
        return await fn(extractedCtx);
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
    });
  }
}
