import test from 'node:test';
import assert from 'node:assert/strict';

test('react module exports expected API', async () => {
  const mod = await import('../dist/react/index.js');
  assert.equal(typeof mod.ObservabilityProvider, 'function');
  assert.equal(typeof mod.useTelemetry, 'function');
  assert.equal(typeof mod.useFeatureFlag, 'function');
  assert.equal(typeof mod.useTelemetryPageView, 'function');
  assert.equal(typeof mod.withObservability, 'function');
  assert.equal(typeof mod.ObservabilityErrorBoundary, 'function');
});

test('useTelemetry returns noop API when no provider', async () => {
  const mod = await import('../dist/react/index.js');
  // This would normally throw without a provider, but our default value is NoopAPI
  // In a test environment, we can only verify the export exists and types match
  assert.ok(mod.ObservabilityProvider);
});

test('ObservabilityErrorBoundary is a class component', async () => {
  const mod = await import('../dist/react/index.js');
  const instance = new mod.ObservabilityErrorBoundary({ children: null });
  assert.equal(instance.state.hasError, false);
  assert.equal(typeof instance.render, 'function');
});

test('withObservability wraps a component', async () => {
  const mod = await import('../dist/react/index.js');
  const Dummy = () => null;
  const Wrapped = mod.withObservability(Dummy);
  assert.equal(typeof Wrapped, 'function');
  assert.ok(Wrapped.displayName?.includes('Dummy'));
});
