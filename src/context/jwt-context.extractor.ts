import type { PrincipalContext } from '@omnixys/context';
import type { FastifyRequest } from 'fastify';

/**
 * Compatibility adapter for verified principal metadata.
 *
 * It deliberately does not decode bearer tokens. Signature verification and
 * claim validation belong to the security package.
 */
export class JwtContextExtractor {
  static extractPrincipal(req: FastifyRequest): PrincipalContext | undefined {
    const request = req as unknown as Record<string, unknown>;
    const direct = request.contextPrincipal;
    if (isPrincipalContext(direct)) return direct;

    const user = request.user;
    if (!isRecord(user)) return undefined;
    return isPrincipalContext(user.contextPrincipal)
      ? user.contextPrincipal
      : undefined;
  }

  /**
   * @deprecated Use `extractPrincipal()`. This method now accepts verified
   * principal metadata only and never parses an Authorization header.
   */
  static extract(
    req: FastifyRequest,
  ): { userId: string; tenantId: string } | null {
    const principal = JwtContextExtractor.extractPrincipal(req);
    const userId =
      principal?.userId ?? principal?.actorId ?? principal?.subject;
    if (!userId || !principal?.tenantId) return null;

    return { userId, tenantId: principal.tenantId };
  }
}

function isPrincipalContext(value: unknown): value is PrincipalContext {
  if (!isRecord(value)) return false;
  return (
    typeof value.subject === 'string' &&
    value.subject.length > 0 &&
    Array.isArray(value.roles) &&
    value.roles.every((role) => typeof role === 'string')
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
