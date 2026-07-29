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
    'SpanNaming',
    'KafkaTrace',
    'CacheTrace',
    'W3CPropagator',
    'ObservabilityModule',
    'AdaptiveSampler',
  ]) {
    assert.ok(exportName in observability, `missing export: ${exportName}`);
  }
});

test('root entry does NOT export browser/react/analytics/feature-flags', () => {
  // These must NOT be in the root barrel to avoid bundling issues
  assert.ok(!('initializeBrowserTracing' in observability));
  assert.ok(!('ObservabilityProvider' in observability));
  assert.ok(!('createBrowserAnalytics' in observability));
  assert.ok(!('createNodeAnalytics' in observability));
  assert.ok(!('createFeatureFlagClient' in observability));
});
