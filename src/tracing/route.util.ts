import type { FastifyRequest } from 'fastify';

export class RouteUtil {
  static resolve(req: FastifyRequest): string {
    // Fastify internal (not typed, but exists sometimes)
    const anyReq = req as any;

    if (anyReq.routerPath) {
      return anyReq.routerPath;
    }

    if (anyReq.routeOptions?.url) {
      return anyReq.routeOptions.url;
    }

    if (anyReq.context?.config?.url) {
      return anyReq.context.config.url;
    }

    // fallback
    return req.url;
  }
}
