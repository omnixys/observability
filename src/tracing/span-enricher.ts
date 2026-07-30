import { ContextAccessor } from '@omnixys/context-ts';
import type { Attributes, Span } from '@opentelemetry/api';

/** Adds safe request metadata from the canonical context to an OTel span. */
export class SpanEnricher {
  static enrich(span: Span, legacyContext?: any): void {
    for (const [name, value] of Object.entries(
      SpanEnricher.attributes(span, legacyContext),
    )) {
      if (value !== undefined) span.setAttribute(name, value);
    }
  }

  static attributes(span: Span, legacyContext?: any): Attributes {
    const canonical = ContextAccessor.get();
    const spanContext = span.spanContext();
    const userId =
      canonical?.principal?.userId ??
      canonical?.principal?.actorId ??
      legacyContext?.userId;

    return compactAttributes({
      'trace.id': spanContext.traceId,
      'span.id': spanContext.spanId,
      'request.id': canonical?.requestId ?? legacyContext?.requestId,
      'correlation.id':
        canonical?.correlationId ?? legacyContext?.correlationId,
      'tenant.id': canonical?.tenant?.tenantId ?? legacyContext?.tenantId,
      'actor.id': canonical?.principal?.actorId ?? legacyContext?.actorId,
      'user.id': userId,
      'client.address': canonical?.client?.ip,
      'transport.type': canonical?.transport?.type,
      'transport.route': canonical?.transport?.route,
      'transport.operation': canonical?.transport?.operation,
    });
  }
}

function compactAttributes(
  attributes: Readonly<Record<string, string | undefined>>,
): Attributes {
  return Object.fromEntries(
    Object.entries(attributes).filter(
      (entry): entry is [string, string] => entry[1] !== undefined,
    ),
  );
}
