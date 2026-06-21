import { ClsService, CorrelationIdService } from '../dist/context/index.js';
import { registerCorrelation } from '../dist/http/correlation.hook.js';
import { ContextAccessor } from '@omnixys/context';
import assert from 'node:assert/strict';
import test from 'node:test';

test('legacy correlation hook creates a validated canonical scope', () => {
  let hook;
  registerCorrelation(
    {
      addHook(name, handler) {
        assert.equal(name, 'onRequest');
        hook = handler;
      },
    },
    new CorrelationIdService(new ClsService()),
  );

  hook(
    {
      headers: {
        'x-request-id': 'request-1',
        'x-correlation-id': 'correlation-1',
      },
    },
    {},
    () => {
      assert.equal(ContextAccessor.getOrThrow().requestId, 'request-1');
      assert.equal(ContextAccessor.getOrThrow().correlationId, 'correlation-1');
    },
  );

  assert.equal(ContextAccessor.get(), undefined);
});

test('legacy correlation hook rejects malformed external IDs', () => {
  let hook;
  registerCorrelation(
    { addHook: (_name, handler) => (hook = handler) },
    new CorrelationIdService(new ClsService()),
  );

  hook(
    {
      headers: {
        'x-request-id': 'contains spaces',
        'x-correlation-id': 'also contains spaces',
      },
    },
    {},
    () => {
      assert.match(ContextAccessor.getOrThrow().requestId, /^[0-9a-f-]{36}$/);
      assert.equal(
        ContextAccessor.getOrThrow().correlationId,
        ContextAccessor.getOrThrow().requestId,
      );
    },
  );
});

test('legacy correlation hook cannot replace an active canonical value', () => {
  let hook;
  registerCorrelation(
    { addHook: (_name, handler) => (hook = handler) },
    new CorrelationIdService(new ClsService()),
  );

  ContextAccessor.run(
    {
      requestId: 'canonical-request',
      correlationId: 'canonical-correlation',
    },
    () =>
      hook(
        { headers: { 'x-correlation-id': 'attacker-correlation' } },
        {},
        () => {
          assert.equal(
            ContextAccessor.getOrThrow().correlationId,
            'canonical-correlation',
          );
        },
      ),
  );
});
