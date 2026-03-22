import { context, propagation, trace } from "@opentelemetry/api";
import type { FastifyInstance } from "fastify";
import { RouteUtil } from "../tracing/route.util.js";
import { SpanEnricher } from "../tracing/span-enricher.js";
import { SpanNaming } from "../tracing/span-naming.util.js";

export function registerFastifyTracing(app: FastifyInstance) {
  const tracer = trace.getTracer("http");

  app.addHook("onRequest", (req, _reply, done) => {
    const extracted = propagation.extract(context.active(), req.headers);

    context.with(extracted, () => {
      const route = RouteUtil.resolve(req);

      const span = tracer.startSpan(SpanNaming.http(req.method, route));

      span.setAttribute("http.method", req.method);
      span.setAttribute("http.route", route);

      (req as any).__span = span;

      done();
    });
  });

  app.addHook("onResponse", (req, reply, done) => {
    const span = (req as any).__span;

    if (span) {
      span.setAttribute("http.status_code", reply.statusCode);
      SpanEnricher.enrich(span);
      span.end();
    }

    done();
  });

  app.addHook("onError", (req, _reply, err, done) => {
    const span = (req as any).__span;

    if (span) {
      span.recordException(err);
      span.setStatus({
        code: 2,
        message: err.message,
      });
    }

    done();
  });
}
