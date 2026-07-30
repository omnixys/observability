import React from 'react';
import { createContext, createElement, useContext, useEffect, useMemo, useRef } from 'react';
import { SpanStatusCode, trace } from '@opentelemetry/api';
import type { BrowserObservabilityConfig } from '../browser/index.js';
import {
  clearUserOnSpan,
  initializeBrowserTracing,
  setUserOnSpan,
} from '../browser/index.js';

export interface ObservabilityConfig {
  browser?: BrowserObservabilityConfig;
}

export interface ObservabilityAPI {
  recordException: (error: Error, context?: Record<string, unknown>) => void;
  identifyUser: (userId: string, traits?: Record<string, unknown>) => void;
  resetUser: () => void;
  capturePageView: (path: string, title?: string) => void;
  captureGraphQLOperation: (operation: string, durationMs: number, error?: Error) => void;
  startSpan: (name: string) => { end: () => void };
}

const NoopAPI: ObservabilityAPI = {
  recordException: () => {},
  identifyUser: () => {},
  resetUser: () => {},
  capturePageView: () => {},
  captureGraphQLOperation: () => {},
  startSpan: () => ({ end: () => {} }),
};

export const ObservabilityContext = createContext<ObservabilityAPI>(NoopAPI);

export interface ObservabilityProviderProps {
  children: React.ReactNode;
  config: ObservabilityConfig;
}

export function ObservabilityProvider({
  children,
  config,
}: ObservabilityProviderProps): React.ReactElement {
  const browserConfig = config.browser;

  useEffect(() => {
    if (browserConfig) {
      initializeBrowserTracing(browserConfig).catch(() => {});
    }
  }, [browserConfig]);

  const api: ObservabilityAPI = useMemo(() => {
    const adapter: ObservabilityAPI = {
      recordException: (error, context) => {
        const span = trace.getActiveSpan();
        span?.recordException(error);
        span?.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
        setSafeAttributes(span, context);
      },

      identifyUser: (userId, traits) => {
        setUserOnSpan(userId, traits);
      },

      resetUser: () => {
        clearUserOnSpan();
      },

      capturePageView: (path, title) => {
        const span = trace.getTracer('omnixys-browser').startSpan('navigation');
        span.setAttribute('url.path', path);
        if (title) span.setAttribute('document.title', title);
        span.end();
      },

      captureGraphQLOperation: (operation, durationMs, error) => {
        const span = trace.getTracer('omnixys-browser').startSpan(`graphql ${operation}`);
        span.setAttribute('graphql.operation.name', operation);
        span.setAttribute('graphql.duration_ms', durationMs);
        if (error) {
          span.recordException(error);
          span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
        }
        span.end();
      },

      startSpan: (name) => {
        const span = trace.getTracer('omnixys-browser').startSpan(name);
        return {
          end: () => span.end(),
        };
      },
    };
    return adapter;
  }, []);

  return createElement(ObservabilityContext.Provider, { value: api }, children);
}

export function useTelemetry(): ObservabilityAPI {
  return useContext(ObservabilityContext);
}

export function useTelemetryPageView(): void {
  const telemetry = useTelemetry();
  const pathRef = useRef<string | null>(null);

  useEffect(() => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (pathRef.current !== path) {
      pathRef.current = path;
      telemetry.capturePageView(path, document.title);
    }
  });
}

function setSafeAttributes(
  span: ReturnType<typeof trace.getActiveSpan>,
  attributes?: Record<string, unknown>,
): void {
  if (!span || !attributes) return;
  for (const [key, value] of Object.entries(attributes)) {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      span.setAttribute(key, value);
    }
  }
}

export function withObservability<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  config?: ObservabilityConfig,
): React.ComponentType<P> {
  const Wrapped = (props: P): React.ReactElement => {
    const mergedConfig = useMemo(() => config ?? {}, []);
    return createElement(
      ObservabilityProvider,
      { config: mergedConfig } as React.Attributes & ObservabilityProviderProps,
      createElement(Component, props),
    );
  };
  Wrapped.displayName = `withObservability(${Component.displayName ?? Component.name ?? 'Component'})`;
  return Wrapped;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ObservabilityErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    try {
      this.props.onError?.(error, errorInfo);
    } catch {
      // Telemetry must never break the application
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
