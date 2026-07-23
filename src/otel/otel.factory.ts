import type { ObservabilityModuleOptions } from '../core/observability.options.js';
import { AdaptiveSampler } from '../tracing/adaptive-sampler.js';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPLogExporter as GrpcLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';
import { OTLPLogExporter as HttpLogExporter } from '@opentelemetry/exporter-logs-otlp-proto-http';
import { OTLPTraceExporter as GrpcExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPTraceExporter as HttpExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {
  defaultResource,
  detectResources,
  envDetector,
  hostDetector,
  osDetector,
  processDetector,
  resourceFromAttributes,
} from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';

export async function createOtelSDK(
  options: ObservabilityModuleOptions,
): Promise<NodeSDK> {
  const detected = await detectResources({
    detectors: [envDetector, hostDetector, osDetector, processDetector],
  });

  const resource = defaultResource()
    .merge(detected)
    .merge(
      resourceFromAttributes({
        'service.name': options.serviceName,
        'service.namespace': 'omnixys',
        'service.instance.id': process.pid,
        ...options.resourceAttributes,
      }),
    );

  const isGrpc = options.otel.transport === 'grpc';

  const traceExporter = isGrpc
    ? new GrpcExporter({ url: options.otel.endpoint })
    : new HttpExporter({ url: options.otel.endpoint });

  const contextManager = new AsyncLocalStorageContextManager();
  contextManager.enable();

  const metricReaders = options.metrics?.enabled
    ? [new PrometheusExporter({ port: options.metrics.port ?? 9464 })]
    : [];

  const logRecordProcessor =
    options.logs?.enabled !== false
      ? new BatchLogRecordProcessor(
          isGrpc
            ? new GrpcLogExporter({ url: options.otel.endpoint })
            : new HttpLogExporter({ url: options.otel.endpoint }),
        )
      : undefined;

  return new NodeSDK({
    contextManager,
    resource,
    sampler: new AdaptiveSampler(options.otel.samplingRatio ?? 0.1),
    traceExporter,
    metricReaders,
    logRecordProcessor,
  });
}
