import { SpanEnricher } from './span-enricher.js';
import { context, trace, SpanKind } from '@opentelemetry/api';

export function setupPrismaSpans(prisma: any) {
  const tracer = trace.getTracer('omnixys.prisma');

  prisma.$on('query', (event: any) => {
    const parent = trace.getActiveSpan();

    const ctx = parent
      ? trace.setSpan(context.active(), parent)
      : context.active();

    const span = tracer.startSpan(
      'prisma.query',
      {
        kind: SpanKind.CLIENT,
        attributes: {
          'db.system': 'postgresql',
          'db.statement': event.query,
          'db.duration_ms': event.duration,
        },
      },
      ctx, // ✅ korrekt
    );

    SpanEnricher.enrich(span);

    span.end();
  });
}
