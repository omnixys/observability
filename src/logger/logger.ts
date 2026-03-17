import { Inject, Injectable, Optional } from "@nestjs/common";
import { context, trace } from "@opentelemetry/api";

import { KafkaProducerService, KafkaTopics, LogstreamTopic, LogDTO } from "@omnixys/kafka";

import { OBSERVABILITY_OPTIONS } from "../module/observability.constants.js";
import { ObservabilityModuleOptions } from "../module/observability.options.js";

import { BatchLogger } from "./batch-logger.js";
import { LogLevel } from "@omnixys/shared";
import { format } from "util";

  function normalizeForLogging(arg: unknown): unknown {
    if (arg && typeof arg === "object") {
      return Array.isArray(arg)
        ? arg.map(normalizeForLogging)
        : JSON.parse(JSON.stringify(arg));
    }
    return arg;
  }

@Injectable()
export class OmnixysLogger {
  private readonly service: string;
  private readonly topic: LogstreamTopic;
  private readonly batch?: BatchLogger;

  constructor(
    @Inject(OBSERVABILITY_OPTIONS)
    private readonly options: ObservabilityModuleOptions,

    @Optional()
    private readonly kafka?: KafkaProducerService,
  ) {
    this.service = options.serviceName;
    this.topic = this.resolveTopic(this.service);

    if (this.kafka) {
      this.batch = new BatchLogger(this.kafka);
    }
  }

  // ------------------------------
  // Scoped Logger
  // ------------------------------
  child(operation: string) {
    return new ScopedLogger(this.service, operation, this.topic, this.batch);
  }

  private resolveTopic(service: string): LogstreamTopic {
    const topic =
      KafkaTopics.logstream[service as keyof typeof KafkaTopics.logstream];

    if (!topic) {
      return KafkaTopics.logstream.event;
    }

    return topic;
  }
}

// ============================================
// Scoped Logger
// ============================================
class ScopedLogger {
  constructor(
    private readonly service: string,
    private readonly operation: string,
    private readonly topic: LogstreamTopic,
    private readonly batch?: BatchLogger,
  ) {}

  private getTrace() {
    const span = trace.getSpan(context.active());
    if (!span) return undefined;

    const ctx = span.spanContext();

    return {
      traceId: ctx.traceId,
      spanId: ctx.spanId,
      sampled: String(ctx.traceFlags === 1),
    };
  }

  private log(level: LogLevel, message: string, ...args: unknown[]) {
    let metadata: Record<string, unknown> | undefined;
    let formatArgs = args;

    // 👉 wenn letztes Argument ein Object ist → metadata
    if (
      args.length > 0 &&
      typeof args[args.length - 1] === "object" &&
      !Array.isArray(args[args.length - 1])
    ) {
      metadata = args[args.length - 1] as Record<string, unknown>;
      formatArgs = args.slice(0, -1);
    }

    const msg = this.fmt(message, formatArgs);
    const traceContext = this.getTrace();

    const entry: LogDTO = {
      level,
      message: msg,
      metadata,
      service: this.service,
      operation: this.operation,
      timestamp: new Date().toISOString(),
      topic: this.topic,
      traceContext,
    };

    console.log(JSON.stringify(entry));

    this.batch?.push(entry);
  }

  info(message: string, ...args: unknown[]) {
    this.log(LogLevel.INFO, message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    this.log(LogLevel.ERROR, message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    this.log(LogLevel.WARN, message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  trace(message: string, ...args: unknown[]) {
    this.log(LogLevel.TRACE, message, ...args);
  }

  private fmt(message: string, args: unknown[]): string {
    const normalized = args.map(normalizeForLogging);
    return format(message, ...normalized);
  }

}
