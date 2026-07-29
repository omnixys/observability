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
  './analytics/browser': '../dist/analytics/browser.js',
  './analytics/node': '../dist/analytics/node.js',
  './feature-flags': '../dist/feature-flags/index.js',
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

test('analytics/browser entry point loads without posthog-node', async () => {
  const mod = await import('../dist/analytics/browser.js');
  assert.equal(typeof mod.createBrowserAnalytics, 'function');
  const source = mod.createBrowserAnalytics.toString();
  assert.ok(!source.includes('posthog-node'), 'must not import posthog-node');
});

test('analytics/node entry point loads without posthog-js', async () => {
  const mod = await import('../dist/analytics/node.js');
  assert.equal(typeof mod.createNodeAnalytics, 'function');
  const source = mod.createNodeAnalytics.toString();
  assert.ok(!source.includes('posthog-js'), 'must not import posthog-js');
});

test('feature-flags entry point loads without NestJS deps', async () => {
  const mod = await import('../dist/feature-flags/index.js');
  assert.equal(typeof mod.createFeatureFlagClient, 'function');
  assert.ok(!('ObservabilityModule' in mod));
});
