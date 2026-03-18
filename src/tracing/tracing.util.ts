import { context, trace } from "@opentelemetry/api";

/**
 * Extracts traceId and spanId from the current active span.
 */
export function getTraceContext() {
  const span = trace.getSpan(context.active());

  if (!span) {
    return {
      traceId: undefined,
      spanId: undefined,
    };
  }

  const spanContext = span.spanContext();

  return {
    traceId: spanContext.traceId,
    spanId: spanContext.spanId,
  };
}
