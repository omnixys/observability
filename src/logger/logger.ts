import { Inject, Injectable, Optional } from "@nestjs/common";
import { context, trace } from "@opentelemetry/api";

import {
  KafkaProducerService,
  KafkaTopics,
  LogstreamTopic,
  LogDTO,
} from "@omnixys/kafka";

import { OBSERVABILITY_OPTIONS } from "../module/observability.constants.js";
import { ObservabilityModuleOptions } from "../module/observability.options.js";

import { BatchLogger } from "./batch-logger.js";
import { LogLevel } from "@omnixys/shared";
import { format } from "util";
import { getLogger } from "./get-logger.js";

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

    // console.log("LOGGER SERVICE", this.service);
    // console.log("LOGGER TOPIC", this.topic);
    // console.log("LOGGER TOPIC TYPE", typeof this.topic);
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
export class ScopedLogger {
  private readonly pino;

  constructor(
    private readonly service: string,
    private readonly operation: string,
    private readonly topic: LogstreamTopic,
    private readonly batch?: BatchLogger,
  ) {
    this.pino = getLogger(operation, "operation");
  }

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
    let metadata: Record<string, unknown> | undefined = {};
    let formatArgs = args;

    // ------------------------------
    // 1. detect explicit metadata
    // ------------------------------
    if (
      args.length > 0 &&
      typeof args[args.length - 1] === "object" &&
      args[args.length - 1] !== null &&
      !Array.isArray(args[args.length - 1])
    ) {
      metadata = safeSerialize(args[args.length - 1]) as Record<
        string,
        unknown
      >;
      formatArgs = args.slice(0, -1);
    }

    // ------------------------------
    // 2. printf message (human readable)
    // ------------------------------
    const msg = format(message, ...formatArgs);

// ------------------------------
// 3. smart structured extraction
// ------------------------------
const extractedArgs = mapArgsToMetadata(message, formatArgs);

metadata = {
  ...extractedArgs,
  ...metadata,
};

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

    // console.log(JSON.stringify(entry));
    this.pino[level.toLowerCase() as "info" | "error" | "warn" | "debug"](
      {
        ...metadata,
        traceId: traceContext?.traceId,
        spanId: traceContext?.spanId,
        service: this.service,
        class: this.operation,
      },
      msg,
    );

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
    return format(message, ...args); // ✅ RAW args!
  }
}

function safeSerialize(value: unknown): unknown {
  if (value === undefined) return undefined;

  const seen = new WeakSet();

  try {
    const json = JSON.stringify(value, (_key, val) => {
      if (typeof val === "object" && val !== null) {
        if (seen.has(val)) return "[Circular]";
        seen.add(val);
      }

      if (val instanceof Error) {
        return {
          message: val.message,
          stack: val.stack,
        };
      }

      if (typeof val === "bigint") {
        return val.toString();
      }

      return val;
    });

    return json === undefined ? undefined : JSON.parse(json);
  } catch {
    return "[Unserializable]";
  }
}

function extractKeysFromMessage(message: string): string[] {
  const keys: string[] = [];

  // matches: actor=%s, name=%d, user=%o
  const regex = /(\w+)=\s*%[sdifoO]/g;

  let match;
  while ((match = regex.exec(message)) !== null) {
    keys.push(match[1]);
  }

  return keys;
}

function mapArgsToMetadata(
  message: string,
  args: unknown[],
): Record<string, unknown> {
  const metadata: Record<string, unknown> = {};
  const keys = extractKeysFromMessage(message);

  args.forEach((arg, index) => {
    const key = keys[index] ?? `arg${index}`;

    if (typeof arg === "object" && arg !== null) {
      metadata[key] = safeSerialize(arg);
    } else {
      metadata[key] = arg;
    }
  });

  return metadata;
}