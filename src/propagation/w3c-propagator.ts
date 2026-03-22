import { context, propagation } from "@opentelemetry/api";

export class W3CPropagator {
  inject(headers: Record<string, string>) {
    propagation.inject(context.active(), headers);
  }

  extract(headers: Record<string, any>) {
    return propagation.extract(context.active(), headers);
  }
}
