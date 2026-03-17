import {
  Inject,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from "@nestjs/common";
import { startOtelSDK, shutdownOtelSDK } from "../otel/otel.js";
import { OBSERVABILITY_OPTIONS } from "../module/observability.constants.js";
import { ObservabilityModuleOptions } from "../module/observability.options.js";

@Injectable()
export class OtelProvider implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(OBSERVABILITY_OPTIONS)
    private readonly options: ObservabilityModuleOptions,
  ) {}

  async onModuleInit() {
    await startOtelSDK(this.options);
  }

  async onModuleDestroy() {
    await shutdownOtelSDK();
  }
}
