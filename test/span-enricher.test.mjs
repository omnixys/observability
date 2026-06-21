import { SpanEnricher } from '../dist/tracing/span-enricher.js';
import { ContextAccessor } from '@omnixys/context';
import assert from 'node:assert/strict';
import test from 'node:test';

test('span enrichment uses canonical request metadata', () => {
  const attributes = new Map();
  const span = fakeSpan(attributes);

  ContextAccessor.run(
    {
      requestId: 'request-1',
      correlationId: 'correlation-1',
      startedAtEpochMs: Date.now(),
      principal: {
        subject: 'subject-1',
        actorId: 'actor-1',
        userId: 'user-1',
        roles: [],
      },
      tenant: {
        tenantId: 'tenant-1',
        source: 'principal',
        verified: true,
      },
      client: { ip: '203.0.113.10' },
      transport: {
        type: 'http',
        route: '/orders/:id',
        operation: 'getOrder',
      },
    },
    () =>
      SpanEnricher.enrich(span, {
        correlationId: 'legacy-correlation',
        tenantId: 'legacy-tenant',
        userId: 'legacy-user',
      }),
  );

  assert.equal(attributes.get('trace.id'), 'trace-1');
  assert.equal(attributes.get('span.id'), 'span-1');
  assert.equal(attributes.get('request.id'), 'request-1');
  assert.equal(attributes.get('correlation.id'), 'correlation-1');
  assert.equal(attributes.get('tenant.id'), 'tenant-1');
  assert.equal(attributes.get('actor.id'), 'actor-1');
  assert.equal(attributes.get('user.id'), 'user-1');
  assert.equal(attributes.get('client.address'), '203.0.113.10');
  assert.equal(attributes.get('transport.type'), 'http');
  assert.equal(attributes.get('transport.route'), '/orders/:id');
});

test('legacy SpanEnricher input remains an operational fallback', () => {
  const attributes = new Map();
  SpanEnricher.enrich(fakeSpan(attributes), {
    requestId: 'legacy-request',
    correlationId: 'legacy-correlation',
    tenantId: 'legacy-tenant',
    actorId: 'legacy-actor',
    userId: 'legacy-user',
  });

  assert.equal(attributes.get('request.id'), 'legacy-request');
  assert.equal(attributes.get('correlation.id'), 'legacy-correlation');
  assert.equal(attributes.get('tenant.id'), 'legacy-tenant');
  assert.equal(attributes.get('actor.id'), 'legacy-actor');
  assert.equal(attributes.get('user.id'), 'legacy-user');
});

function fakeSpan(attributes) {
  return {
    spanContext: () => ({ traceId: 'trace-1', spanId: 'span-1' }),
    setAttribute(name, value) {
      attributes.set(name, value);
      return this;
    },
  };
}
