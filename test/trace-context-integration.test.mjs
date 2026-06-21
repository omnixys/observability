import {
  runWithCanonicalTrace,
  TraceContextExtractor,
} from '../dist/context/index.js';
import { OtelLogger } from '../dist/logging/otel-logger.service.js';
import { TraceInterceptor } from '../dist/tracing/trace.interceptor.js';
import { TraceService } from '../dist/tracing/trace.service.js';
import { ContextAccessor } from '@omnixys/context';
import { context, SpanStatusCode, trace } from '@opentelemetry/api';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import assert from 'node:assert/strict';
import test from 'node:test';
import { lastValueFrom, Observable } from 'rxjs';

test('trace interceptor keeps OTel and canonical metadata aligned', async () => {
  const contextManager = new AsyncLocalStorageContextManager().enable();
  context.setGlobalContextManager(contextManager);

  const exporter = new InMemorySpanExporter();
  const provider = new BasicTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(exporter)],
  });
  trace.setGlobalTracerProvider(provider);

  const interceptor = new TraceInterceptor();
  const logger = new OtelLogger();
  const traceService = new TraceService();
  let handlerSnapshot;
  let activeTraceId;

  await ContextAccessor.run(baseSnapshot(), () =>
    lastValueFrom(
      interceptor.intercept(httpExecutionContext(), {
        handle: () =>
          new Observable((subscriber) => {
            setTimeout(() => {
              handlerSnapshot = ContextAccessor.getOrThrow();
              activeTraceId = traceService.traceId();
              logger.log('info', 'handled request', {
                'correlation.id': 'caller-must-not-override-canonical',
                custom: 'value',
              });
              subscriber.next('ok');
              subscriber.complete();
            }, 2);
          }),
      }),
    ),
  );

  await provider.forceFlush();
  const spans = exporter.getFinishedSpans();
  assert.equal(spans.length, 1);

  const [span] = spans;
  assert.equal(handlerSnapshot.trace.traceId, span.spanContext().traceId);
  assert.equal(handlerSnapshot.trace.spanId, span.spanContext().spanId);
  assert.equal(activeTraceId, span.spanContext().traceId);
  assert.equal(span.attributes['request.id'], 'request-1');
  assert.equal(span.attributes['correlation.id'], 'correlation-1');
  assert.equal(span.attributes['tenant.id'], 'tenant-1');
  assert.equal(span.attributes['http.status_code'], 200);
  assert.notEqual(span.status.code, SpanStatusCode.ERROR);

  const logEvent = span.events.find(({ name }) => name === 'log');
  assert.equal(logEvent.attributes['correlation.id'], 'correlation-1');
  assert.equal(logEvent.attributes['request.id'], 'request-1');
  assert.equal(logEvent.attributes['trace.id'], span.spanContext().traceId);
  assert.equal(logEvent.attributes.custom, 'value');

  await provider.shutdown();
  contextManager.disable();
  context.disable();
  trace.disable();
});

test('plain trace metadata is scoped and restored', async () => {
  const span = {
    spanContext: () => ({ traceId: 'trace-child', spanId: 'span-child' }),
  };

  await ContextAccessor.run(baseSnapshot(), async () => {
    await runWithCanonicalTrace(span, async () => {
      await Promise.resolve();
      assert.deepEqual(ContextAccessor.getOrThrow().trace, {
        traceId: 'trace-child',
        spanId: 'span-child',
      });
      assert.deepEqual(TraceContextExtractor.current(), {
        traceId: 'trace-child',
        spanId: 'span-child',
      });
    });

    assert.equal(ContextAccessor.getOrThrow().trace, undefined);
  });
});

function baseSnapshot() {
  return {
    requestId: 'request-1',
    correlationId: 'correlation-1',
    startedAtEpochMs: Date.now(),
    principal: {
      subject: 'subject-1',
      actorId: 'actor-1',
      userId: 'user-1',
      roles: [],
    },
    tenant: {
      tenantId: 'tenant-1',
      source: 'principal',
      verified: true,
    },
    client: { ip: '203.0.113.10' },
    transport: { type: 'http', route: '/orders' },
  };
}

function httpExecutionContext() {
  return {
    getType: () => 'http',
    switchToHttp: () => ({
      getRequest: () => ({ method: 'GET', url: '/orders' }),
      getResponse: () => ({ statusCode: 200 }),
    }),
  };
}
