import test from 'node:test';
import assert from 'node:assert/strict';

const SUBPATH_MODULE_MAP = {
  '.': '../dist/index.js',
  './core': '../dist/core/index.js',
  './tracing': '../dist/tracing/index.js',
  './context': '../dist/context/index.js',
  './propagation': '../dist/propagation/index.js',
  './http': '../dist/http/index.js',
  './graphql': '../dist/graphql/index.js',
  './logging': '../dist/logging/index.js',
  './metrics': '../dist/metrics/index.js',
  './kafka': '../dist/kafka/index.js',
  './cache': '../dist/cache/index.js',
  './browser': '../dist/browser/index.js',
  './react': '../dist/react/index.js',
};

test('all sub-path exports resolve and are ES modules', async () => {
  for (const [subpath, modulePath] of Object.entries(SUBPATH_MODULE_MAP)) {
    const mod = await import(modulePath);
    assert.ok(mod, `sub-path ${subpath} should resolve`);
  }
});

test('browser entry point loads without NestJS deps', async () => {
  const mod = await import('../dist/browser/index.js');
  assert.equal(typeof mod.initializeBrowserTracing, 'function');
  assert.ok(!('ObservabilityModule' in mod));
  assert.ok(!('TraceInterceptor' in mod));
});
