import { context, propagation } from "@opentelemetry/api";

export class KafkaPropagator {
  inject(headers: Record<string, any>) {
    propagation.inject(context.active(), headers);
  }

  extract(headers: Record<string, any>) {
    return propagation.extract(context.active(), headers);
  }
}
