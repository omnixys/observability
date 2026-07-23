import type { ObservabilityModuleOptions } from '../core/observability.options.js';
import { AdaptiveSampler } from '../tracing/adaptive-sampler.js';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPLogExporter as GrpcLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';
import { OTLPLogExporter as HttpLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
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
        'service.version':
          process.env.OTEL_SERVICE_VERSION ??
          process.env.npm_package_version ??
          'unknown',
        'deployment.environment.name':
          process.env.DEPLOYMENT_ENVIRONMENT ??
          process.env.NODE_ENV ??
          'local',
        'service.instance.id': process.pid,
        ...options.resourceAttributes,
      }),
    );

  const isGrpc = options.otel.transport === 'grpc';
  const endpoints = resolveOtlpSignalEndpoints(options.otel.endpoint, isGrpc);

  const traceExporter = isGrpc
    ? new GrpcExporter({ url: endpoints.traces })
    : new HttpExporter({ url: endpoints.traces });

  const contextManager = new AsyncLocalStorageContextManager();
  contextManager.enable();

  const metricReaders = options.metrics?.enabled
    ? [new PrometheusExporter({ port: options.metrics.port ?? 9464 })]
    : [];

  const logRecordProcessor =
    options.logs?.enabled !== false
      ? new BatchLogRecordProcessor(
          isGrpc
            ? new GrpcLogExporter({ url: endpoints.logs })
            : new HttpLogExporter({ url: endpoints.logs }),
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

export interface OtlpSignalEndpoints {
  readonly base: string;
  readonly traces: string;
  readonly logs: string;
}

/**
 * Accepts the canonical OTLP base URL and remains compatible with the former
 * TEMPO_URI value which ended in /v1/traces.
 */
export function resolveOtlpSignalEndpoints(
  endpoint: string,
  grpc = false,
): OtlpSignalEndpoints {
  const trimmed = endpoint.replace(/\/+$/, '');
  const base = trimmed.replace(/\/v1\/(?:traces|logs)$/, '');

  if (grpc) {
    return { base, traces: base, logs: base };
  }

  return {
    base,
    traces: `${base}/v1/traces`,
    logs: `${base}/v1/logs`,
  };
}
