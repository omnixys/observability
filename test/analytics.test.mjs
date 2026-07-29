import test from 'node:test';
import assert from 'node:assert/strict';

test('analytics browser adapter exports expected API', async () => {
  const mod = await import('../dist/analytics/browser.js');
  assert.equal(typeof mod.createBrowserAnalytics, 'function');
});

test('createBrowserAnalytics returns noop when disabled', async () => {
  const mod = await import('../dist/analytics/browser.js');
  const adapter = mod.createBrowserAnalytics({ apiKey: 'test', host: 'http://localhost', enabled: false });
  assert.doesNotThrow(() => adapter.trackEvent({ name: 'test' }));
  assert.doesNotThrow(() => adapter.identifyUser({ userId: '1' }));
  assert.doesNotThrow(() => adapter.resetUser());
  await adapter.shutdown();
});

test('createBrowserAnalytics returns noop in SSR (no window)', async () => {
  const mod = await import('../dist/analytics/browser.js');
  const adapter = mod.createBrowserAnalytics({ apiKey: 'test', host: 'http://localhost', enabled: true });
  assert.doesNotThrow(() => adapter.trackEvent({ name: 'test' }));
  await adapter.shutdown();
});

test('analytics node adapter exports expected API', async () => {
  const mod = await import('../dist/analytics/node.js');
  assert.equal(typeof mod.createNodeAnalytics, 'function');
});

test('createNodeAnalytics returns noop when disabled', async () => {
  const mod = await import('../dist/analytics/node.js');
  const adapter = mod.createNodeAnalytics({ apiKey: 'test', host: 'http://localhost', enabled: false });
  assert.doesNotThrow(() => adapter.trackEvent({ name: 'test' }));
  assert.doesNotThrow(() => adapter.identifyUser({ userId: '1' }));
  await adapter.shutdown();
});

test('browser and node are separate entry points', async () => {
  const browserMod = await import('../dist/analytics/browser.js');
  const nodeMod = await import('../dist/analytics/node.js');
  assert.notStrictEqual(browserMod, nodeMod);
  assert.equal(Object.keys(browserMod).length, 1);
  assert.equal(Object.keys(nodeMod).length, 1);
  assert.deepEqual(Object.keys(browserMod), ['createBrowserAnalytics']);
  assert.deepEqual(Object.keys(nodeMod), ['createNodeAnalytics']);
});
