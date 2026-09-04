/**
 * Global registry token mirroring `@omnixys/logger-ts`. The logger module
 * binds its `OmnixysLogger` provider under this exact symbol, so consumers can
 * inject it without a package dependency on the logger itself.
 */
export const OMNIXYS_LOGGER = Symbol.for('@omnixys/logger-ts');

export interface PlatformScopedErrorLogger {
  error(message: string, metadata?: unknown): void;
}

export interface PlatformTraceLogger {
  log(context: string, source?: string): PlatformScopedErrorLogger;
}
