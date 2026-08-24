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

test('initializeBrowserTracing works without the zone.js polyfill', async () => {
  const browser = await import('../dist/browser/index.js');
  const { context, ROOT_CONTEXT } = await import('@opentelemetry/api');

  assert.ok(!globalThis.Zone, 'precondition: zone.js must not be loaded');

  const hadWindow = Object.hasOwn(globalThis, 'window');
  // Minimal window stub: initializeBrowserTracing only guards on its presence,
  // and the empty instrumentation set must never touch browser globals.
  globalThis.window = {};

  try {
    const result = await browser.initializeBrowserTracing({
      enabled: true,
      instrumentations: [],
      otlpEndpoint: 'http://127.0.0.1:9/v1/traces',
    });

    // Regression: the former explicit ZoneContextManager registration forked
    // Zone.current on every context switch and threw
    // "ReferenceError: Can't find variable: Zone" because consumers never
    // load the zone.js polyfill. Context switching must work without it.
    assert.equal(typeof result.shutdown, 'function');
    assert.equal(context.with(ROOT_CONTEXT, () => 42), 42);

    const manager = context._getContextManager();
    assert.equal(manager.constructor.name, 'StackContextManager');
    assert.equal(manager._createZone, undefined);

    await result.shutdown();
  } finally {
    if (!hadWindow) {
      delete globalThis.window;
    }
  }
});

test('user-interaction instrumentation warns about the zone.js requirement', async () => {
  const browser = await import('../dist/browser/index.js');
  const { diag } = await import('@opentelemetry/api');

  const warnings = [];
  diag.setLogger({
    debug() {},
    info() {},
    warn(...args) {
      warnings.push(args.map((entry) => String(entry)).join(' '));
    },
    error() {},
  });

  const hadWindow = Object.hasOwn(globalThis, 'window');
  // Isolated stub so the instrumentation cannot patch real Node globals.
  globalThis.window = {};

  try {
    await browser.initializeBrowserTracing({
      enabled: true,
      instrumentations: ['user-interaction'],
      otlpEndpoint: 'http://127.0.0.1:9/v1/traces',
    });

    assert.ok(
      warnings.some((entry) =>
        entry.includes("'user-interaction'") && entry.includes('zone.js'),
      ),
      `expected a zone.js requirement warning, got: ${JSON.stringify(warnings)}`,
    );
  } finally {
    diag.disable();
    if (!hadWindow) {
      delete globalThis.window;
    }
  }
});
