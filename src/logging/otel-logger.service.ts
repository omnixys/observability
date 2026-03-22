import { Injectable } from "@nestjs/common";
import { trace } from "@opentelemetry/api";
import { ErrorClassifier } from "./error-classifier.js";
import type { LogLevel } from "./log-level.enum.js";

@Injectable()
export class OtelLogger {
  log(level: LogLevel, message: string, meta?: Record<string, any>) {
    const span = trace.getActiveSpan();

    if (!span) return;

    span.addEvent("log", {
      "log.level": level,
      "log.message": message,
      ...meta,
    });
  }

  error(message: string, err: unknown) {
    const span = trace.getActiveSpan();

    if (!span) return;

    span.recordException(err as Error);

    span.addEvent("error", {
      message,
      classification: ErrorClassifier.classify(err),
    });
  }
}
