import { diag, trace } from '@opentelemetry/api';
import type { Span } from '@opentelemetry/api';

export interface BrowserObservabilityConfig {
  serviceName?: string;
  environment?: string;
  sampleRate?: number;
  otlpEndpoint?: string;
  instrumentations?: BrowserInstrumentation[];
  propagateTraceHeaderCorsUrls?: string | RegExp;
  enabled?: boolean;
}

export type BrowserInstrumentation = 'fetch' | 'xhr' | 'document-load' | 'user-interaction';

let shutdownFn: (() => Promise<void>) | null = null;

export async function initializeBrowserTracing(
  config: BrowserObservabilityConfig = {},
): Promise<{ shutdown: () => Promise<void> }> {
  const resolvedConfig = {
    serviceName: config.serviceName ?? 'omnixys-web',
    environment: config.environment ?? 'production',
    sampleRate: config.sampleRate ?? 0.1,
    otlpEndpoint: config.otlpEndpoint ?? '/otel/v1/traces',
    instrumentations: config.instrumentations ?? ['fetch'],
    propagateTraceHeaderCorsUrls: config.propagateTraceHeaderCorsUrls ?? /.*/,
    enabled: config.enabled ?? false,
  };

  if (!resolvedConfig.enabled) {
    return { shutdown: async () => {} };
  }

  if (typeof window === 'undefined') {
    return { shutdown: async () => {} };
  }

  try {
    const { registerInstrumentations } = await import(
      '@opentelemetry/instrumentation'
    );
    const { resourceFromAttributes, defaultResource } = await import(
      '@opentelemetry/resources'
    );
    const { ATTR_SERVICE_NAME } = await import(
      '@opentelemetry/semantic-conventions'
    );
    const { OTLPTraceExporter } = await import(
      '@opentelemetry/exporter-trace-otlp-http'
    );
    const { SimpleSpanProcessor } = await import(
      '@opentelemetry/sdk-trace-base'
    );
    const { WebTracerProvider } = await import(
      '@opentelemetry/sdk-trace-web'
    );

    const resource = defaultResource().merge(
      resourceFromAttributes({
        [ATTR_SERVICE_NAME]: resolvedConfig.serviceName,
        'service.version': '1.0.0',
        'deployment.environment': resolvedConfig.environment,
      }),
    );

    const exporter = new OTLPTraceExporter({
      url: resolvedConfig.otlpEndpoint,
    });

    const provider = new WebTracerProvider({
      resource,
      spanProcessors: [new SimpleSpanProcessor(exporter)],
    });

    const instrumentations: Array<unknown> = [];
    for (const name of resolvedConfig.instrumentations) {
      switch (name) {
        case 'fetch': {
          const { FetchInstrumentation } = await import(
            '@opentelemetry/instrumentation-fetch'
          );
          instrumentations.push(
            new FetchInstrumentation({
              ignoreUrls: [resolvedConfig.otlpEndpoint],
              propagateTraceHeaderCorsUrls: resolvedConfig.propagateTraceHeaderCorsUrls,
              clearTimingResources: true,
            }),
          );
          break;
        }
        case 'xhr': {
          const { XMLHttpRequestInstrumentation } = await import(
            '@opentelemetry/instrumentation-xml-http-request'
          );
          instrumentations.push(new XMLHttpRequestInstrumentation());
          break;
        }
        case 'document-load': {
          const { DocumentLoadInstrumentation } = await import(
            '@opentelemetry/instrumentation-document-load'
          );
          instrumentations.push(new DocumentLoadInstrumentation());
          break;
        }
        case 'user-interaction': {
          const { UserInteractionInstrumentation } = await import(
            '@opentelemetry/instrumentation-user-interaction'
          );
          instrumentations.push(new UserInteractionInstrumentation());
          break;
        }
      }
    }

    registerInstrumentations({
      instrumentations: instrumentations as any,
    });

    provider.register({});

    shutdownFn = async () => {
      await provider.shutdown();
    };

    return { shutdown: shutdownFn };
  } catch (error) {
    diag.warn('Failed to initialize browser tracing', error);
    return { shutdown: async () => {} };
  }
}

export function getActiveSpan(): Span | undefined {
  return trace.getActiveSpan();
}

export function setUserOnSpan(userId: string, traits?: Record<string, unknown>): void {
  const span = getActiveSpan();
  if (span) {
    span.setAttribute('enduser.id', userId);
    if (traits?.email) {
      span.setAttribute('enduser.email', String(traits.email));
    }
  }
}

export function clearUserOnSpan(): void {
  const span = getActiveSpan();
  if (span) {
    span.setAttribute('enduser.id', '');
  }
}
