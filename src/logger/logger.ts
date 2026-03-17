import { Inject, Injectable, Optional } from "@nestjs/common";
import { context, trace } from "@opentelemetry/api";

import { KafkaProducerService, KafkaTopics, LogstreamTopic, LogDTO } from "@omnixys/kafka";

import { OBSERVABILITY_OPTIONS } from "../module/observability.constants.js";
import { ObservabilityModuleOptions } from "../module/observability.options.js";

import { BatchLogger } from "./batch-logger.js";
import { LogLevel } from "@omnixys/shared";

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

  private log(
    level: LogLevel,
    message: string,
    metadata?: Record<string, unknown>,
  ) {
    const traceContext = this.getTrace();

    const entry: LogDTO = {
      level,
      message,
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

  info(msg: string, meta?: Record<string, unknown>) {
    this.log(LogLevel.INFO, msg, meta);
  }

  error(msg: string, meta?: Record<string, unknown>) {
    this.log(LogLevel.ERROR, msg, meta);
  }

  warn(msg: string, meta?: Record<string, unknown>) {
    this.log(LogLevel.WARN, msg, meta);
  }

  debug(msg: string, meta?: Record<string, unknown>) {
    this.log(LogLevel.DEBUG, msg, meta);
  }

  trace(msg: string, meta?: Record<string, unknown>) {
    this.log(LogLevel.TRACE, msg, meta);
  }
}
