import { ContextAccessor } from '@omnixys/context-ts';
import { context, trace } from '@opentelemetry/api';

export class TraceContextExtractor {
  static current(): { traceId: string; spanId: string } | null {
    const span = trace.getSpan(context.active());
    if (!span) {
      const metadata = ContextAccessor.get()?.trace;
      return metadata?.traceId && metadata.spanId
        ? { traceId: metadata.traceId, spanId: metadata.spanId }
        : null;
    }

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
