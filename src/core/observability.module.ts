import { type DynamicModule, Global, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ClsService } from "../context/cls.service.js";
import { CorrelationIdService } from "../context/correlation-id.service.js";
import { RequestContextService } from "../context/request-context.service.js";
import { GraphQLInterceptor } from "../graphql/graphql.interceptor.js";
import { OtelLogger } from "../logging/otel-logger.service.js";
import { OtelProvider } from "../otel/otel.provider.js";
import { TraceInterceptor } from "../tracing/trace.interceptor.js";
import { TraceService } from "../tracing/trace.service.js";
import { OBSERVABILITY_OPTIONS } from "./observability.constants.js";
import type { ObservabilityModuleOptions } from "./observability.options.js";

@Global()
@Module({})
export class ObservabilityModule {
  static forRoot(options: ObservabilityModuleOptions): DynamicModule {
    return {
      module: ObservabilityModule,
      providers: [
        {
          provide: OBSERVABILITY_OPTIONS,
          useValue: options,
        },
        OtelProvider,
        TraceService,
        ClsService,
        CorrelationIdService,
        RequestContextService,
        OtelLogger,
        {
          provide: APP_INTERCEPTOR,
          useClass: TraceInterceptor,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: GraphQLInterceptor,
        },
      ],
      exports: [TraceService, ClsService, CorrelationIdService, RequestContextService, OtelLogger],
    };
  }
}
