import test from 'node:test';
import assert from 'node:assert/strict';

test('feature-flags module exports expected API', async () => {
  const mod = await import('../dist/feature-flags/index.js');
  assert.equal(typeof mod.createFeatureFlagClient, 'function');
});

test('createFeatureFlagClient returns noop when disabled', async () => {
  const mod = await import('../dist/feature-flags/index.js');
  const client = mod.createFeatureFlagClient({ apiKey: 'test', host: 'http://localhost', enabled: false });
  assert.equal(await client.isEnabled('test-flag'), false);
  assert.equal(await client.isEnabled('test-flag', true), true);
  assert.equal(await client.getValue('test-flag', 'fallback'), 'fallback');
  assert.deepEqual(await client.getAllFlags(), {});
  await client.reload();
  const unsub = client.onFlagsChanged(() => {});
  assert.equal(typeof unsub, 'function');
  unsub();
  await client.shutdown();
});

test('createFeatureFlagClient returns noop when posthog unavailable', async () => {
  const mod = await import('../dist/feature-flags/index.js');
  const client = mod.createFeatureFlagClient({ apiKey: 'test', host: 'http://localhost', enabled: true });
  assert.equal(await client.isEnabled('test-flag'), false);
  await client.shutdown();
});

test('feature flag client handles unknown flags gracefully', async () => {
  const mod = await import('../dist/feature-flags/index.js');
  const client = mod.createFeatureFlagClient({ apiKey: 'test', host: 'http://localhost', enabled: false });
  assert.equal(await client.isEnabled('nonexistent-flag'), false);
  assert.equal(await client.getValue('nonexistent-flag', 42), 42);
});
