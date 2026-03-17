export interface BatchLoggerConfig {
  maxBatchSize: number; // z.B. 100 logs
  flushInterval: number; // z.B. 50ms
}

export const DEFAULT_BATCH_CONFIG: BatchLoggerConfig = {
  maxBatchSize: 100,
  flushInterval: 50,
};
