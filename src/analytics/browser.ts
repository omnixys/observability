import type { AnalyticsAdapter, AnalyticsConfig } from './analytics-types.js';

export type BrowserAnalyticsConfig = AnalyticsConfig & {
  capturePageviews?: boolean;
  persistence?: 'localStorage' | 'sessionStorage' | 'memory' | 'cookie';
  sessionRecording?: boolean;
  crossSubdomainCookie?: boolean;
};

class NoopBrowserAnalytics implements AnalyticsAdapter {
  trackEvent(): void {}
  identifyUser(): void {}
  resetUser(): void {}
  async shutdown(): Promise<void> {}
}

export function createBrowserAnalytics(
  config: BrowserAnalyticsConfig,
): AnalyticsAdapter {
  if (!config.enabled) {
    return new NoopBrowserAnalytics();
  }

  if (typeof window === 'undefined') {
    return new NoopBrowserAnalytics();
  }

  try {
    const adapter = new PostHogBrowserAdapter(config);
    return adapter;
  } catch {
    return new NoopBrowserAnalytics();
  }
}

interface PostHogInstance {
  init(apiKey: string, config: Record<string, unknown>): boolean;
  capture(event: string, properties?: Record<string, unknown>): void;
  identify(userId: string, traits?: Record<string, unknown>): void;
  reset(): void;
  opt_out_capturing(): void;
  startSessionRecording(): void;
}

class PostHogBrowserAdapter implements AnalyticsAdapter {
  private posthog: PostHogInstance | null = null;

  constructor(config: BrowserAnalyticsConfig) {
    let ph: { default: PostHogInstance };
    try {
      ph = require('posthog-js') as { default: PostHogInstance };
    } catch {
      return;
    }

    const posthogInstance = ph.default;
    if (!posthogInstance) return;

    const loaded = posthogInstance.init(config.apiKey, {
      api_host: config.host,
      capture_pageview: config.capturePageviews ?? false,
      persistence: config.persistence ?? 'localStorage',
      ip: config.ip ?? false,
      cross_subdomain_cookie: config.crossSubdomainCookie ?? false,
      loaded: (instance: PostHogInstance) => {
        if (config.optOut) {
          instance.opt_out_capturing();
        }
        if (config.sessionRecording) {
          instance.startSessionRecording();
        }
      },
    });

    if (loaded) {
      this.posthog = posthogInstance;
    }
  }

  trackEvent(event: { name: string; properties?: Record<string, unknown> }): void {
    if (!this.posthog) return;
    const safeProperties = this.sanitizeProperties(event.properties);
    this.posthog.capture(event.name, safeProperties);
  }

  identifyUser(payload: { userId: string; traits?: Record<string, unknown> }): void {
    if (!this.posthog) return;
    const safeTraits = this.sanitizeProperties(payload.traits);
    this.posthog.identify(payload.userId, safeTraits);
  }

  resetUser(): void {
    if (!this.posthog) return;
    this.posthog.reset();
  }

  async shutdown(): Promise<void> {
    this.posthog = null;
  }

  private sanitizeProperties(
    properties?: Record<string, unknown>,
  ): Record<string, unknown> | undefined {
    if (!properties) return undefined;
    const blockedKeys = new Set([
      'password',
      'token',
      'authorization',
      'cookie',
      'secret',
      'signature',
      'qrcode',
      'ticket',
      'invitation',
      'access_token',
      'refresh_token',
      'api_key',
    ]);
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(properties)) {
      if (!blockedKeys.has(key.toLowerCase())) {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
}
