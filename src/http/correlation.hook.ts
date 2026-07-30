import type { CorrelationIdService } from '../context/correlation-id.service.js';
import {
  ContextAccessor,
  DefaultCorrelationIdResolver,
  DefaultRequestIdResolver,
} from '@omnixys/context-ts';
import type { FastifyInstance } from 'fastify';

const requestIdResolver = new DefaultRequestIdResolver();
const correlationIdResolver = new DefaultCorrelationIdResolver();

/**
 * @deprecated Register `ContextModule` instead. This hook remains as a safe
 * compatibility adapter for Fastify applications without Nest middleware.
 */
export function registerCorrelation(
  app: FastifyInstance,
  correlation: CorrelationIdService,
) {
  app.addHook('onRequest', (request, _reply, done) => {
    if (ContextAccessor.get()) {
      done();
      return;
    }

    const requestId = requestIdResolver.resolve(
      request.headers['x-request-id'],
    );
    const correlationId = correlationIdResolver.resolve(
      request.headers['x-correlation-id'],
      requestId,
    );

    ContextAccessor.run({ requestId, correlationId }, () => {
      correlation.set(correlationId);
      done();
    });
  });
}
