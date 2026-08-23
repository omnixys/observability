import { registerFastifyTracing } from '../dist/index.js';
import { getRequestTraceContext } from '@omnixys/context-ts';
import assert from 'node:assert/strict';
import test from 'node:test';

test('Fastify tracing stores serializable trace metadata on the request', () => {
  const hooks = new Map();
  const app = {
    addHook(name, handler) {
      hooks.set(name, handler);
    },
  };
  registerFastifyTracing(app);

  const request = { method: 'POST', url: '/graphql', headers: {} };
  hooks.get('onRequest')(request, {}, () => {});

  const trace = getRequestTraceContext(request);
  assert.match(trace.traceId, /^[0-9a-f]{32}$/);
  assert.match(trace.spanId, /^[0-9a-f]{16}$/);
});
