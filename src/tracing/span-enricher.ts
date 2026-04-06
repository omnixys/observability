import { TraceContextExtractor } from '../context/trace-context.extractor.js';
import type { Span } from '@opentelemetry/api';

export class SpanEnricher {
  static enrich(span: Span, context?: any) {
    const trace = TraceContextExtractor.current();

    if (trace) {
      span.setAttribute('trace.id', trace.traceId);
      span.setAttribute('span.id', trace.spanId);
    }

    if (context?.userId) {
      span.setAttribute('user.id', context.userId);
    }

    if (context?.tenantId) {
      span.setAttribute('tenant.id', context.tenantId);
    }

    if (context?.correlationId) {
      span.setAttribute('correlation.id', context.correlationId);
    }
  }
}
