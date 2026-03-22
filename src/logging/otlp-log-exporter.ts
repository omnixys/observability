import { context, trace } from "@opentelemetry/api";

export class OtelLogExporter {
  static emit(message: string, data?: Record<string, any>) {
    const span = trace.getSpan(context.active());

    if (!span) return;

    span.addEvent("log", {
      message,
      ...data,
    });
  }
}
