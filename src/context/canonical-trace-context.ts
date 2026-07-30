import { ContextAccessor } from '@omnixys/context-ts';
import type { Span } from '@opentelemetry/api';

/** Runs work with the active OTel identifiers exposed as plain context metadata. */
export function runWithCanonicalTrace<T>(span: Span, fn: () => T): T {
  const snapshot = ContextAccessor.get();
  if (!snapshot) return fn();

  const { traceId, spanId } = span.spanContext();
  return ContextAccessor.run(
    {
      ...snapshot,
      trace: { traceId, spanId },
    },
    fn,
  );
}
