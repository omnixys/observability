import { HeaderCarrier } from '../propagation/header-carrier.interface.js';
import {
  context,
  propagation,
  trace,
  SpanKind,
  SpanStatusCode,
} from '@opentelemetry/api';

export class KafkaTrace {
  /**
   * 🔥 Inject current trace into headers
   */
  static inject(carrier: HeaderCarrier) {
    propagation.inject(context.active(), carrier);
  }

  /**
   * 🔥 Extract trace and run function inside context
   */
  static async extract<T>(
    carrier: HeaderCarrier,
    fn: () => Promise<T>,
  ): Promise<T> {
    const extracted = propagation.extract(context.active(), carrier);

    return context.with(extracted, fn);
  }

  /**
   * 🔥 Producer span
   */
  static async produce<T>(topic: string, fn: () => Promise<T>): Promise<T> {
    const tracer = trace.getTracer('omnixys.kafka');

    const ctx = context.active(); // 🔥 WICHTIG

    return context.with(ctx, async () => {
      return tracer.startActiveSpan(
        `Kafka PRODUCE ${topic}`,
        { kind: SpanKind.PRODUCER },
        async (span) => {
          try {
            span.setAttribute('messaging.system', 'kafka');
            span.setAttribute('messaging.destination', topic);

            return await fn();
          } catch (err: any) {
            span.recordException(err);
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: err.message,
            });
            throw err;
          } finally {
            span.end();
          }
        },
      );
    });
  }

  /**
   * 🔥 Consumer span
   */
  static async consume<T>(topic: string, fn: () => Promise<T>): Promise<T> {
    const tracer = trace.getTracer('omnixys.kafka');

    return tracer.startActiveSpan(
      `Kafka CONSUME ${topic}`,
      { kind: SpanKind.CONSUMER },
      async (span) => {
        try {
          span.setAttribute('messaging.system', 'kafka');
          span.setAttribute('messaging.destination', topic);

          const result = await fn();

          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (err: any) {
          span.recordException(err);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err.message,
          });
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }
}
