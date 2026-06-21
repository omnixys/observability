import { SpanEnricher } from '../tracing/span-enricher.js';
import { runWithCanonicalTrace } from './canonical-trace-context.js';
import {
  trace,
  SpanKind,
  SpanStatusCode,
  SpanContext,
  ROOT_CONTEXT,
} from '@opentelemetry/api';

type Options = {
  serviceName: string;
  captureParams?: boolean;
  sanitize?: (params: unknown) => unknown;
};

type PrismaMiddlewareParams = {
  model?: string;
  action: string;
  args?: unknown;
};

type PrismaMiddlewareNext = (
  params: PrismaMiddlewareParams,
) => Promise<unknown>;

type PrismaMiddleware = (
  params: PrismaMiddlewareParams,
  next: PrismaMiddlewareNext,
) => Promise<unknown>;

type PrismaLikeClient = {
  $on(event: 'query', callback: (event: QueryEvent) => void): void;
};

type QueryEvent = {
  query: string;
  duration: number;
};

export function setupTracing(client: PrismaLikeClient) {
  client.$on('query', (event) => {
    const span = trace.getActiveSpan();

    if (!span) return;

    const statement =
      event.query.length > 500
        ? event.query.slice(0, 500) + '...'
        : event.query;

    const operation = event.query.split(' ')[0];

    span.addEvent('db.query', {
      'db.system': 'postgresql',
      'db.operation': operation,
      'db.statement': statement,
      'db.duration_ms': event.duration,
    });
  });
}

export function createPrismaMiddleware(options: Options): PrismaMiddleware {
  const tracer = trace.getTracer('omnixys.prisma');

  return async (params, next) => {
    const spanName = `prisma.${params.model ?? 'raw'}.${params.action}`;

    return tracer.startActiveSpan(
      spanName,
      {
        kind: SpanKind.CLIENT,
        attributes: {
          'db.system': 'postgresql',
          'db.operation': params.action,
          'db.model': params.model ?? 'raw',
        },
      },
      async (span) => {
        SpanEnricher.enrich(span);
        const start = process.hrtime.bigint();

        try {
          if (options.captureParams && params.args) {
            const safeArgs = options.sanitize
              ? options.sanitize(params.args)
              : '[captured]';

            span.setAttribute('db.params', JSON.stringify(safeArgs));
          }

          const result = await runWithCanonicalTrace(span, () => next(params));

          const duration = Number(process.hrtime.bigint() - start) / 1_000_000;

          span.setAttribute('db.duration_ms', duration);
          span.setStatus({ code: SpanStatusCode.OK });

          return result;
        } catch (error: any) {
          span.recordException(error);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message,
          });

          throw error;
        } finally {
          span.end();
        }
      },
    );
  };
}
