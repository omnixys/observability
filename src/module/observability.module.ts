import { DynamicModule, Global, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { OBSERVABILITY_OPTIONS } from "./observability.constants.js";
import { ObservabilityModuleOptions } from "./observability.options.js";

import { startOtelSDK } from "../otel/otel.js";
import { OmnixysLogger } from "../logger/logger.js";
import { KafkaModule } from "@omnixys/kafka";

import { TraceInterceptor } from "../tracing/trace.interceptor.js";
import { OtelProvider } from "../otel/otel.provider.js";
@Global()
@Module({})
export class ObservabilityModule {
  static forRoot(options: ObservabilityModuleOptions): DynamicModule {
    return {
      module: ObservabilityModule,

      imports: [
        ...(options.kafka
          ? [
              KafkaModule.forRoot({
                clientId:
                  options.kafka.clientId ?? `${options.serviceName}-service`,
                brokers: options.kafka.brokers,
                groupId: `${options.serviceName}-logstream-consumer`,
              }),
            ]
          : []),
      ],

      providers: [
        {
          provide: OBSERVABILITY_OPTIONS,
          useValue: options,
        },

        OmnixysLogger,

        OtelProvider,

        {
          provide: APP_INTERCEPTOR,
          useClass: TraceInterceptor,
        },
      ],

      exports: [OmnixysLogger],
    };
  }
}
