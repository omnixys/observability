export type FlagType = 'boolean' | 'string' | 'number' | 'json';

export interface FlagDefinition<T = boolean> {
  key: string;
  defaultValue: T;
  type: FlagType;
  description?: string;
}

export interface FeatureFlagClient {
  isEnabled(key: string, defaultValue?: boolean): Promise<boolean>;
  getValue<T>(key: string, defaultValue: T): Promise<T>;
  getAllFlags(): Promise<Record<string, unknown>>;
  reload(): Promise<void>;
  onFlagsChanged(callback: (flags: Record<string, unknown>) => void): () => void;
  shutdown(): Promise<void>;
}

export type FeatureFlagConfig = {
  apiKey: string;
  host: string;
  enabled?: boolean;
  pollInterval?: number;
  personalProperties?: () => Record<string, unknown>;
};

interface PostHogInstance {
  init(apiKey: string, config: Record<string, unknown>): void;
  isFeatureEnabled(key: string, options?: Record<string, unknown>): boolean;
  getFeatureFlag(key: string, options?: Record<string, unknown>): string | boolean | null;
  onFeatureFlags(callback: (flags: string[], items: unknown[]) => void): void;
  reloadFeatureFlags(): void;
  capture(event: string, properties?: Record<string, unknown>): void;
  identify(userId: string, traits?: Record<string, unknown>): void;
  reset(): void;
  opt_out_capturing(): void;
}

class NoopFeatureFlagClient implements FeatureFlagClient {
  async isEnabled(_key: string, defaultValue?: boolean): Promise<boolean> {
    return defaultValue ?? false;
  }
  async getValue<T>(_key: string, defaultValue: T): Promise<T> {
    return defaultValue;
  }
  async getAllFlags(): Promise<Record<string, unknown>> {
    return {};
  }
  async reload(): Promise<void> {}
  onFlagsChanged(_callback: (flags: Record<string, unknown>) => void): () => void {
    return () => {};
  }
  async shutdown(): Promise<void> {}
}

export function createFeatureFlagClient(
  config: FeatureFlagConfig,
): FeatureFlagClient {
  if (!config.enabled) {
    return new NoopFeatureFlagClient();
  }

  try {
    if (typeof window !== 'undefined') {
      const client = createBrowserFlagClient(config);
      return client;
    }
    const client = createServerFlagClient(config);
    return client;
  } catch {
    return new NoopFeatureFlagClient();
  }
}

function createBrowserFlagClient(config: FeatureFlagConfig): FeatureFlagClient {
  let ph: { default: PostHogInstance } | null = null;
  try {
    ph = require('posthog-js') as { default: PostHogInstance };
  } catch {
    return new NoopFeatureFlagClient();
  }

  const posthog = ph.default;
  if (!posthog) return new NoopFeatureFlagClient();

  try {
    posthog.init(config.apiKey, {
      api_host: config.host,
      capture_pageview: false,
      ip: false,
      loaded: () => {},
    });
  } catch {
    return new NoopFeatureFlagClient();
  }

  const flagCache = new Map<string, boolean>();
  const callbacks = new Set<(flags: Record<string, unknown>) => void>();

  posthog.onFeatureFlags((flags: string[]) => {
    flagCache.clear();
    const flagMap: Record<string, unknown> = {};
    for (const flag of flags) {
      const enabled = posthog.isFeatureEnabled(flag);
      flagCache.set(flag, enabled);
      flagMap[flag] = enabled;
    }
    callbacks.forEach((cb) => cb(flagMap));
  });

  return {
    async isEnabled(key: string, defaultValue?: boolean): Promise<boolean> {
      if (!posthog) return defaultValue ?? false;
      return posthog.isFeatureEnabled(key, { send_event: false }) ?? defaultValue ?? false;
    },
    async getValue<T>(key: string, defaultValue: T): Promise<T> {
      if (!posthog) return defaultValue;
      try {
        const value = posthog.getFeatureFlag(key);
        return (value as T) ?? defaultValue;
      } catch {
        return defaultValue;
      }
    },
    async getAllFlags(): Promise<Record<string, unknown>> {
      return Object.fromEntries(flagCache);
    },
    async reload(): Promise<void> {
      posthog.reloadFeatureFlags();
    },
    onFlagsChanged(callback: (flags: Record<string, unknown>) => void): () => void {
      callbacks.add(callback);
      return () => callbacks.delete(callback);
    },
    async shutdown(): Promise<void> {
      callbacks.clear();
    },
  };
}

function createServerFlagClient(config: FeatureFlagConfig): FeatureFlagClient {
  let PostHogClass: { PostHog: new (apiKey: string, options: Record<string, unknown>) => { isFeatureEnabled: (key: string, distinctId: string, options?: Record<string, unknown>) => Promise<boolean | undefined>; getFeatureFlag: (key: string, distinctId: string, options?: Record<string, unknown>) => Promise<string | boolean | undefined>; shutdown: () => Promise<void> } };
  try {
    PostHogClass = require('posthog-node') as typeof PostHogClass;
  } catch {
    return new NoopFeatureFlagClient();
  }

  const client = new PostHogClass.PostHog(config.apiKey, {
    host: config.host,
    flushAt: 1,
    flushInterval: 0,
  });

  const personalProperties = config.personalProperties ?? (() => ({} as Record<string, unknown>));

  return {
    async isEnabled(key: string, defaultValue?: boolean): Promise<boolean> {
      try {
        const props = personalProperties() as Record<string, unknown>;
        const distinctId = (props['distinct_id'] as string) ?? 'server';
        return (
          (await client.isFeatureEnabled(key, distinctId, {
            personProperties: props as Record<string, string>,
          })) ?? defaultValue ?? false
        );
      } catch {
        return defaultValue ?? false;
      }
    },
    async getValue<T>(key: string, defaultValue: T): Promise<T> {
      try {
        const props = personalProperties() as Record<string, unknown>;
        const distinctId = (props['distinct_id'] as string) ?? 'server';
        const value = await client.getFeatureFlag(key, distinctId, {
          personProperties: props as Record<string, string>,
        });
        return (value as T) ?? defaultValue;
      } catch {
        return defaultValue;
      }
    },
    async getAllFlags(): Promise<Record<string, unknown>> {
      return {};
    },
    async reload(): Promise<void> {},
    onFlagsChanged(): () => void {
      return () => {};
    },
    async shutdown(): Promise<void> {
      await client.shutdown();
    },
  };
}
