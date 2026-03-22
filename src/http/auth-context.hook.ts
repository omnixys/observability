import { FastifyInstance } from "fastify";
import { RequestContextService } from "../context/request-context.service.js";
import { JwtContextExtractor } from "../context/jwt-context.extractor.js";

export function registerAuthContext(
  app: FastifyInstance,
  ctx: RequestContextService,
) {
  app.addHook("onRequest", (req, _reply, done) => {
    const extracted = JwtContextExtractor.extract(req);

    if (extracted) {
      ctx.setUser(extracted.userId);
      ctx.setTenant(extracted.tenantId);
    }

    done();
  });
}
