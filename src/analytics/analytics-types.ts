export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: Date;
}

export interface IdentifyPayload {
  userId: string;
  traits?: Record<string, unknown>;
}

export interface AnalyticsAdapter {
  trackEvent(event: AnalyticsEvent): void;
  identifyUser(payload: IdentifyPayload): void;
  resetUser(): void;
  shutdown(): Promise<void>;
}

export interface AnalyticsConfig {
  apiKey: string;
  host: string;
  enabled?: boolean;
  ip?: boolean;
  optOut?: boolean;
}
