import type { AnalyticsAdapter, AnalyticsConfig } from './analytics-types.js';

export type NodeAnalyticsConfig = AnalyticsConfig & {
  flushAt?: number;
  flushInterval?: number;
};

class NoopNodeAnalytics implements AnalyticsAdapter {
  trackEvent(): void {}
  identifyUser(): void {}
  resetUser(): void {}
  async shutdown(): Promise<void> {}
}

export function createNodeAnalytics(
  config: NodeAnalyticsConfig,
): AnalyticsAdapter {
  if (!config.enabled) {
    return new NoopNodeAnalytics();
  }

  try {
    const adapter = new PostHogNodeAdapter(config);
    return adapter;
  } catch {
    return new NoopNodeAnalytics();
  }
}

class PostHogNodeAdapter implements AnalyticsAdapter {
  private client: import('posthog-node').PostHog | null = null;

  constructor(config: NodeAnalyticsConfig) {
    let PostHog: typeof import('posthog-node').PostHog;
    try {
      PostHog = require('posthog-node').PostHog;
    } catch {
      return;
    }

    this.client = new PostHog(config.apiKey, {
      host: config.host,
      flushAt: config.flushAt ?? 20,
      flushInterval: config.flushInterval ?? 10000,
    });
  }

  trackEvent(event: { name: string; properties?: Record<string, unknown> }): void {
    if (!this.client) return;
    const safeProperties = this.sanitizeProperties(event.properties);
    this.client.capture({
      distinctId: 'server',
      event: event.name,
      properties: safeProperties,
    });
  }

  identifyUser(payload: { userId: string; traits?: Record<string, unknown> }): void {
    if (!this.client) return;
    this.client.identify({
      distinctId: payload.userId,
      properties: this.sanitizeProperties(payload.traits),
    });
  }

  resetUser(): void {
    // PostHog node client maintains identity per instance; no-op on reset
  }

  async shutdown(): Promise<void> {
    if (this.client) {
      await this.client.shutdown();
      this.client = null;
    }
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
