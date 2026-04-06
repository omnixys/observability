import { OBSERVABILITY_OPTIONS } from '../core/observability.constants.js';
import type { ObservabilityModuleOptions } from '../core/observability.options.js';
import { createOtelSDK } from './otel.factory.js';
import {
  Inject,
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import type { NodeSDK } from '@opentelemetry/sdk-node';

@Injectable()
export class OtelProvider implements OnModuleInit, OnModuleDestroy {
  private sdk!: NodeSDK;

  constructor(
    @Inject(OBSERVABILITY_OPTIONS)
    private readonly options: ObservabilityModuleOptions,
  ) {}

  async onModuleInit() {
    this.sdk = await createOtelSDK(this.options);
    await this.sdk.start();
  }

  async onModuleDestroy() {
    if (this.sdk) {
      await this.sdk.shutdown();
    }
  }
}
