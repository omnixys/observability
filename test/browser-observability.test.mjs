import test from 'node:test';
import assert from 'node:assert/strict';

test('browser module exports expected API', async () => {
  const browser = await import('../dist/browser/index.js');
  assert.equal(typeof browser.initializeBrowserTracing, 'function');
  assert.equal(typeof browser.getActiveSpan, 'function');
  assert.equal(typeof browser.setUserOnSpan, 'function');
  assert.equal(typeof browser.clearUserOnSpan, 'function');
});

test('initializeBrowserTracing returns noop when disabled', async () => {
  const browser = await import('../dist/browser/index.js');
  const result = await browser.initializeBrowserTracing({ enabled: false });
  assert.equal(typeof result.shutdown, 'function');
  await result.shutdown();
});

test('initializeBrowserTracing returns noop when no window', async () => {
  const browser = await import('../dist/browser/index.js');
  const result = await browser.initializeBrowserTracing({ enabled: true });
  assert.equal(typeof result.shutdown, 'function');
  await result.shutdown();
});
