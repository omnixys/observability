import * as observability from '../dist/index.js';
import assert from 'node:assert/strict';
import test from 'node:test';

test('legacy and canonical public APIs remain exported', () => {
  for (const exportName of [
    'ClsService',
    'ContextStore',
    'CorrelationIdService',
    'JwtContextExtractor',
    'RequestContextService',
    'TraceContextExtractor',
    'TraceContextRunner',
    'TraceRunner',
    'registerAuthContext',
    'registerCorrelation',
    'registerFastifyTracing',
    'GraphQLInterceptor',
    'OtelLogger',
    'SpanEnricher',
    'TraceInterceptor',
    'TraceService',
  ]) {
    assert.ok(exportName in observability, `missing export: ${exportName}`);
  }
});
