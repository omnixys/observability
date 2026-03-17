export interface ObservabilityModuleOptions {
  serviceName: string;

  otel: {
    endpoint: string;
    samplingRatio?: number;
  };

  metrics?: {
    port?: number;
  };

  kafka?: {
    brokers: string[];
    clientId?: string;
  };
}
