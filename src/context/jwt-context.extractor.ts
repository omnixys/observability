import type { FastifyRequest } from 'fastify';

export class JwtContextExtractor {
  static extract(req: FastifyRequest) {
    const auth = req.headers['authorization'];

    if (!auth) return null;

    const token = auth.replace('Bearer ', '');

    try {
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString(),
      );

      return {
        userId: payload.sub,
        tenantId: payload.tenant,
      };
    } catch {
      return null;
    }
  }
}
