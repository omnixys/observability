import { context, trace } from "@opentelemetry/api";

export function getTraceContext() {
  const span = trace.getSpan(context.active());
  if (!span) return undefined;

  const ctx = span.spanContext();

  return {
    traceId: ctx.traceId,
    spanId: ctx.spanId,
  };
}

