import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
  detectResources,
  envDetector,
  hostDetector,
  osDetector,
  processDetector,
  resourceFromAttributes,
  defaultResource,
} from "@opentelemetry/resources";

import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
  ParentBasedSampler,
  TraceIdRatioBasedSampler,
} from "@opentelemetry/sdk-trace-base";

import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

import { ObservabilityModuleOptions } from "../module/observability.options.js";

let sdk: NodeSDK | undefined;

export async function startOtelSDK(
  options: ObservabilityModuleOptions,
): Promise<void> {
  if (sdk) return; 

  const detected = await detectResources({
    detectors: [envDetector, hostDetector, osDetector, processDetector],
  });

  const resource = defaultResource()
    .merge(detected)
    .merge(
      resourceFromAttributes({
        "service.name": options.serviceName,
        "service.namespace": "omnixys",
        "service.instance.id": process.pid,
      }),
    );

  const traceExporter = new OTLPTraceExporter({
    url: options.otel.endpoint,
  });

  const prometheusExporter = new PrometheusExporter({
    port: options.metrics?.port ?? 9464,
  });

    const contextManager = new AsyncLocalStorageContextManager();
    contextManager.enable();

  sdk = new NodeSDK({
    resource,
    contextManager,
    traceExporter,
    metricReaders: [prometheusExporter],

    sampler: new ParentBasedSampler({
      root: new TraceIdRatioBasedSampler(options.otel.samplingRatio ?? 1),
    }),

    instrumentations: getNodeAutoInstrumentations(),
  });

  await sdk.start();

  process.on("SIGTERM", shutdownOtelSDK);
  process.on("SIGINT", shutdownOtelSDK);
}

export async function shutdownOtelSDK(): Promise<void> {
  if (!sdk) return;
  await sdk.shutdown();
}
