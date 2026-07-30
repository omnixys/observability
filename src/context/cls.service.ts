import { Injectable } from '@nestjs/common';
import { ContextAccessor, type RequestContext } from '@omnixys/context-ts';
import { context } from '@opentelemetry/api';

const KEY_ALIASES: Readonly<Record<string, keyof RequestContext>> = {
  correlation_id: 'correlationId',
  tenant_id: 'tenantId',
  user_id: 'userId',
};

/**
 * Compatibility facade over the canonical Omnixys request context.
 *
 * @deprecated Prefer `ContextAccessor` from `@omnixys/context-ts` for new code.
 */
@Injectable()
export class ClsService {
  run<T>(fn: () => T): T {
    const activeOpenTelemetryContext = context.active();
    const invoke = () => context.with(activeOpenTelemetryContext, fn);

    return ContextAccessor.current() ? invoke() : ContextAccessor.run({}, invoke);
  }

  set<T>(key: string, value: T): void {
    const current = ContextAccessor.current();
    if (!current) return;

    const canonicalKey = KEY_ALIASES[key];
    if (canonicalKey) {
      ContextAccessor.update({ [canonicalKey]: value });
      return;
    }

    // Preserve arbitrary legacy CLS keys without promoting them into the
    // canonical request metadata model.
    (current as Record<string, unknown>)[key] = value;
  }

  get<T>(key: string): T | undefined {
    const snapshot = ContextAccessor.get();
    if (!snapshot) return undefined;

    if (key === 'correlation_id') return snapshot.correlationId as T;
    if (key === 'tenant_id') return snapshot.tenant?.tenantId as T | undefined;
    if (key === 'user_id') {
      return (snapshot.principal?.userId ??
        snapshot.principal?.actorId ??
        snapshot.principal?.subject) as T | undefined;
    }

    return (ContextAccessor.current() as Record<string, unknown>)[key] as T | undefined;
  }
}
