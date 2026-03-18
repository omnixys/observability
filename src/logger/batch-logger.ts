/**
 * BatchLogger (FIXED - context safe)
 */

import { KafkaProducerService, LogDTO } from "@omnixys/kafka";
import { BatchLoggerConfig, DEFAULT_BATCH_CONFIG } from "./batch.config.js";
import { Context, context } from "@opentelemetry/api";

type InternalLogDTO = LogDTO & {
  __context?: Context;
};

export class BatchLogger {
  private buffer: InternalLogDTO[] = [];
  private timer?: NodeJS.Timeout;

  constructor(
    private readonly kafka: KafkaProducerService,
    private readonly config: BatchLoggerConfig = DEFAULT_BATCH_CONFIG,
  ) {
    this.startTimer();
  }

  push(log: LogDTO) {
    const ctx = context.active();

    this.buffer.push({
      ...log,
      __context: ctx,
    });

    if (this.buffer.length >= this.config.maxBatchSize) {
      void this.flush();
    }
  }

  private async flush() {
    if (this.buffer.length === 0) return;

    const batch = this.buffer;
    this.buffer = [];

    try {
      for (const entry of batch) {
        const ctx = entry.__context ?? context.active();

        await context.with(ctx, async () => {
          const { __context, ...clean } = entry;

          await this.kafka.send(clean.topic, clean, {
            service: clean.service,
            version: "v1",
            operation: clean.operation,
          });
        });
      }
    } catch (err) {
      console.error("❌ BatchLogger flush failed", err);
    }
  }

  private startTimer() {
    this.timer = setInterval(() => {
      void this.flush();
    }, this.config.flushInterval);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    void this.flush();
  }
}
