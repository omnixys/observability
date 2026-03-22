import { context, trace } from "@opentelemetry/api";

export class TraceContextExtractor {
  static current() {
    const span = trace.getSpan(context.active());
    if (!span) return null;

    const ctx = span.spanContext();

    return {
      traceId: ctx.traceId,
      spanId: ctx.spanId,
    };
  }

  static getTraceId(): string | null {
    return TraceContextExtractor.current()?.traceId ?? null;
  }

  static getSpanId(): string | null {
    return TraceContextExtractor.current()?.spanId ?? null;
  }
}
