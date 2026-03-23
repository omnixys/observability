import { context, propagation } from "@opentelemetry/api";
import { HeaderCarrier } from "./header-carrier.interface";

export class W3CPropagator {
  inject(carrier: HeaderCarrier): void {
    propagation.inject(context.active(), carrier, {
      set: (c, key, value) => c.set(key, value),
    });
  }

  extract(carrier: HeaderCarrier) {
    return propagation.extract(context.active(), carrier, {
      get: (c, key) => c.get(key),
      keys: () => [],
    });
  }
}
