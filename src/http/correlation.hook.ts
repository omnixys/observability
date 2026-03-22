import type { FastifyInstance } from "fastify";
import type { CorrelationIdService } from "../context/correlation-id.service.js";

export function registerCorrelation(app: FastifyInstance, correlation: CorrelationIdService) {
  app.addHook("onRequest", (req, _reply, done) => {
    const incoming = req.headers["x-correlation-id"] as string | undefined;

    if (incoming) {
      correlation.set(incoming);
    } else {
      correlation.generate();
    }

    done();
  });
}
