export interface ObservabilityModuleOptions {
  serviceName: string;

  otel: {
    endpoint: string;
    transport?: "http" | "grpc";
    samplingRatio?: number;
  };

  metrics?: {
    enabled?: boolean;
    port?: number;
  };

  resourceAttributes?: Record<string, string>;
}
