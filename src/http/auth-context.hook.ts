import { JwtContextExtractor } from '../context/jwt-context.extractor.js';
import type { RequestContextService } from '../context/request-context.service.js';
import type { FastifyInstance } from 'fastify';

/**
 * @deprecated Verified principals are bridged by `@omnixys/security` and
 * consumed by `ContextModule`.
 */
export function registerAuthContext(
  app: FastifyInstance,
  ctx: RequestContextService,
) {
  app.addHook('onRequest', (req, _reply, done) => {
    const principal = JwtContextExtractor.extractPrincipal(req);

    const userId =
      principal?.userId ?? principal?.actorId ?? principal?.subject;
    if (userId) ctx.setUser(userId);
    if (principal?.tenantId) ctx.setTenant(principal.tenantId);

    done();
  });
}
