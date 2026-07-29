import React from 'react';
import { createContext, createElement, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { AnalyticsAdapter } from '../analytics/analytics-types.js';
import type { FeatureFlagClient } from '../feature-flags/index.js';
import type { BrowserObservabilityConfig } from '../browser/index.js';
import { initializeBrowserTracing } from '../browser/index.js';

export interface ObservabilityConfig {
  analytics?: AnalyticsAdapter;
  featureFlags?: FeatureFlagClient;
  browser?: BrowserObservabilityConfig;
}

export interface ObservabilityAPI {
  trackEvent: (name: string, properties?: Record<string, unknown>) => void;
  recordException: (error: Error, context?: Record<string, unknown>) => void;
  identifyUser: (userId: string, traits?: Record<string, unknown>) => void;
  resetUser: () => void;
  isFeatureEnabled: (key: string, defaultValue?: boolean) => Promise<boolean>;
  getFeatureFlagValue: <T>(key: string, defaultValue: T) => Promise<T>;
  capturePageView: (path: string, title?: string) => void;
  captureGraphQLOperation: (operation: string, durationMs: number, error?: Error) => void;
  startSpan: (name: string) => { end: () => void };
}

const NoopAPI: ObservabilityAPI = {
  trackEvent: () => {},
  recordException: () => {},
  identifyUser: () => {},
  resetUser: () => {},
  isFeatureEnabled: async (_key, defaultValue) => defaultValue ?? false,
  getFeatureFlagValue: async (_key, defaultValue) => defaultValue,
  capturePageView: () => {},
  captureGraphQLOperation: () => {},
  startSpan: () => ({ end: () => {} }),
};

const ObservabilityContext = createContext<ObservabilityAPI>(NoopAPI);

export interface ObservabilityProviderProps {
  children: React.ReactNode;
  config: ObservabilityConfig;
}

export function ObservabilityProvider({
  children,
  config,
}: ObservabilityProviderProps): React.ReactElement {
  const analytics = config.analytics;
  const featureFlags = config.featureFlags;
  const browserConfig = config.browser;

  useEffect(() => {
    if (browserConfig) {
      initializeBrowserTracing(browserConfig).catch(() => {});
    }
  }, [browserConfig]);

  const api: ObservabilityAPI = useMemo(() => {
    const adapter: ObservabilityAPI = {
      trackEvent: (name, properties) => {
        analytics?.trackEvent({ name, properties });
      },

      recordException: (error, context) => {
        analytics?.trackEvent({
          name: '$exception',
          properties: {
            message: error.message,
            name: error.name,
            stack: error.stack,
            ...context,
          },
        });
      },

      identifyUser: (userId, traits) => {
        analytics?.identifyUser({ userId, traits });
      },

      resetUser: () => {
        analytics?.resetUser();
      },

      isFeatureEnabled: async (key, defaultValue) => {
        return featureFlags?.isEnabled(key, defaultValue) ?? defaultValue ?? false;
      },

      getFeatureFlagValue: async (key, defaultValue) => {
        return featureFlags?.getValue(key, defaultValue) ?? defaultValue;
      },

      capturePageView: (path, title) => {
        analytics?.trackEvent({
          name: '$pageview',
          properties: { path, title },
        });
      },

      captureGraphQLOperation: (operation, durationMs, error) => {
        analytics?.trackEvent({
          name: '$graphql_operation',
          properties: {
            operation,
            durationMs,
            error: error?.message,
            errorName: error?.name,
          },
        });
      },

      startSpan: (name) => {
        let ended = false;
        return {
          end: () => {
            if (!ended) {
              ended = true;
              analytics?.trackEvent({
                name: '$span',
                properties: { spanName: name },
              });
            }
          },
        };
      },
    };
    return adapter;
  }, [analytics, featureFlags]);

  return createElement(ObservabilityContext.Provider, { value: api }, children);
}

export function useTelemetry(): ObservabilityAPI {
  return useContext(ObservabilityContext);
}

export function useFeatureFlag(
  key: string,
  defaultValue?: boolean,
): boolean {
  const telemetry = useTelemetry();
  const [flag, setFlag] = useState<boolean>(defaultValue ?? false);
  const telemetryRef = useRef(telemetry);
  telemetryRef.current = telemetry;

  useEffect(() => {
    let cancelled = false;
    telemetry.isFeatureEnabled(key, defaultValue).then((result) => {
      if (!cancelled) setFlag(result);
    });
    return () => { cancelled = true; };
  }, [key, defaultValue, telemetry]);

  return flag;
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
