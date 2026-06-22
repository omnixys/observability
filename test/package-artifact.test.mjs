import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import test from 'node:test';

test('trace runner package artifact includes its canonical context dependency', async () => {
  await access(new URL('../dist/context/canonical-trace-context.js', import.meta.url));
  const { TraceRunner } = await import('../dist/context/trace-runner.js');

  assert.equal(typeof TraceRunner.run, 'function');
});
