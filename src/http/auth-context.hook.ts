import type { FastifyInstance } from "fastify";
import { JwtContextExtractor } from "../context/jwt-context.extractor.js";
import type { RequestContextService } from "../context/request-context.service.js";

export function registerAuthContext(app: FastifyInstance, ctx: RequestContextService) {
  app.addHook("onRequest", (req, _reply, done) => {
    const extracted = JwtContextExtractor.extract(req);

    if (extracted) {
      ctx.setUser(extracted.userId);
      ctx.setTenant(extracted.tenantId);
    }

    done();
  });
}
