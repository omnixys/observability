import {
  ClsService,
  CorrelationIdService,
  JwtContextExtractor,
  RequestContextService,
} from '../dist/context/index.js';
import { ContextAccessor } from '@omnixys/context-ts';
import assert from 'node:assert/strict';
import test from 'node:test';

test('legacy observability services use the canonical context storage', () => {
  const cls = new ClsService();
  const correlation = new CorrelationIdService(cls);
  const requestContext = new RequestContextService(cls);

  ContextAccessor.run({ requestId: 'request-1' }, () => {
    correlation.set('correlation-1');
    requestContext.setUser('user-1');
    requestContext.setTenant('tenant-1');

    assert.equal(correlation.get(), 'correlation-1');
    assert.equal(requestContext.getUser(), 'user-1');
    assert.equal(requestContext.getTenant(), 'tenant-1');
    assert.equal(ContextAccessor.current().correlationId, 'correlation-1');
    assert.equal(ContextAccessor.getOrThrow().correlationId, 'correlation-1');
    assert.equal(ContextAccessor.getOrThrow().tenant.tenantId, 'tenant-1');
  });

  assert.equal(ContextAccessor.get(), undefined);
});

test('ClsService creates a canonical compatibility scope when none exists', () => {
  const cls = new ClsService();

  cls.run(() => {
    cls.set('correlation_id', 'generated-1');
    assert.equal(ContextAccessor.current().correlationId, 'generated-1');
  });

  assert.equal(ContextAccessor.current(), undefined);
});

test('deprecated CLS facade preserves arbitrary keys without owning storage', () => {
  const cls = new ClsService();

  cls.run(() => {
    cls.set('legacy_key', { enabled: true });
    assert.deepEqual(cls.get('legacy_key'), { enabled: true });
    assert.equal(ContextAccessor.getOrThrow().transport.type, 'internal');
  });
});

test('JWT compatibility extraction ignores unverified bearer payloads', () => {
  const payload = Buffer.from(
    JSON.stringify({ sub: 'attacker', tenant: 'spoofed' }),
  ).toString('base64url');
  const request = {
    headers: { authorization: `Bearer header.${payload}.signature` },
  };

  assert.equal(JwtContextExtractor.extract(request), null);
  assert.equal(JwtContextExtractor.extractPrincipal(request), undefined);
});

test('JWT compatibility extraction accepts only a verified contextPrincipal', () => {
  const contextPrincipal = {
    subject: 'subject-1',
    userId: 'user-1',
    tenantId: 'tenant-1',
    roles: ['admin'],
  };
  const request = { headers: {}, user: { contextPrincipal } };

  assert.equal(JwtContextExtractor.extractPrincipal(request), contextPrincipal);
  assert.deepEqual(JwtContextExtractor.extract(request), {
    userId: 'user-1',
    tenantId: 'tenant-1',
  });
});
