import { SpanEnricher } from '../tracing/span-enricher.js';
import {
  context,
  propagation,
  trace,
  SpanKind,
  SpanStatusCode,
} from '@opentelemetry/api';
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export function registerFastifyTracing(app: FastifyInstance) {
  const tracer = trace.getTracer('omnixys.http');

  /**
   * 🟢 ROOT SPAN CREATION
   */
  app.addHook('onRequest', (req, _reply, done) => {
    // 1. Extract context (W3C headers)
    const extracted = propagation.extract(context.active(), req.headers);

    context.with(extracted, () => {
      const span = tracer.startSpan(`${req.method} ${req.url}`, {
        kind: SpanKind.SERVER,
        attributes: {
          'http.method': req.method,
          'http.url': req.url,
        },
      });

      const ctxWithSpan = trace.setSpan(context.active(), span);

      // Bind the Fastify continuation to the extracted OTel context.
      const boundDone = context.bind(ctxWithSpan, done);

      context.with(ctxWithSpan, () => {
        (req as any).__span = span;

        boundDone();
      });
    });
  });

  /**
   * 🟢 RESPONSE HANDLING
   */
  app.addHook(
    'onResponse',
    (req: FastifyRequest, reply: FastifyReply, done) => {
      const span = (req as any).__span;

      if (span) {
        SpanEnricher.enrich(span);
        span.setAttribute('http.status_code', reply.statusCode);
        span.setStatus({ code: SpanStatusCode.OK });
        span.end();
      }

      done();
    },
  );

  /**
   * 🔴 ERROR HANDLING
   */
  app.addHook('onError', (req, _reply, error, done) => {
    const span = (req as any).__span;

    if (span) {
      SpanEnricher.enrich(span);
      span.recordException(error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
    }

    done();
  });
}
