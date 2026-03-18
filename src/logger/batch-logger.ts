import { KafkaProducerService, LogDTO } from "@omnixys/kafka";
import { BatchLoggerConfig, DEFAULT_BATCH_CONFIG } from "./batch.config.js";

export class BatchLogger {
  private buffer: LogDTO[] = [];
  private timer?: NodeJS.Timeout;

  constructor(
    private readonly kafka: KafkaProducerService,
    private readonly config: BatchLoggerConfig = DEFAULT_BATCH_CONFIG,
  ) {
    this.startTimer();
  }

  // ------------------------------
  // Public API
  // ------------------------------
  push(log: LogDTO) {
    this.buffer.push(log);

    if (this.buffer.length >= this.config.maxBatchSize) {
      void this.flush();
    }
  }

  // ------------------------------
  // Flush Logic
  // ------------------------------
  private async flush() {
    if (this.buffer.length === 0) return;

    const batch = this.buffer;
    this.buffer = [];

    try {
      for (const entry of batch) {
        await this.kafka.send(
          entry.topic,
          entry,
          {
            service: entry.service,
            version: "v1",
            operation: entry.operation,
          },
          entry.traceContext,
        );
      }

      // batch
      // await Promise.all(
      //   batch.map((entry) =>
      //     this.kafka.send(
      //       entry.topic,
      //       entry,
      //       {
      //         service: entry.service,
      //         version: "v1",
      //         operation: entry.operation,
      //       },
      //       entry.trace,
      //     ),
      //   ),
      // );
    } catch (err) {
      console.error("❌ BatchLogger flush failed", err);

      // optional: retry / DLQ später
    }
  }

  // ------------------------------
  // Timer
  // ------------------------------
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
