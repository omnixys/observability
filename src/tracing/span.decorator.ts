import { trace } from '@opentelemetry/api';

export function Span(name?: string): MethodDecorator {
  return (_target, propertyKey, descriptor: any) => {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const tracer = trace.getTracer('custom');

      return tracer.startActiveSpan(name ?? String(propertyKey), (span) => {
        try {
          const result = original.apply(this, args);

          if (result instanceof Promise) {
            return result.finally(() => span.end());
          }

          span.end();
          return result;
        } catch (err) {
          span.recordException(err as Error);
          span.end();
          throw err;
        }
      });
    };
  };
}
