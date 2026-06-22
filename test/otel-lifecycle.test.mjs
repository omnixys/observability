import test from 'node:test';

import { createOtelSDK } from '../dist/otel/otel.factory.js';

test('metrics exporter has one managed lifecycle', async () => {
  const sdk = await createOtelSDK({
    serviceName: 'observability-lifecycle-test',
    otel: {
      endpoint: 'http://127.0.0.1:4318/v1/traces',
      transport: 'http',
      samplingRatio: 0,
    },
    metrics: { enabled: true, port: 0 },
  });

  await sdk.start();
  await sdk.shutdown();
});
