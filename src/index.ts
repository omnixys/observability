export * from "./core";

// curated exports (DX friendly)
export * from "./tracing/trace.service.js";
export * from "./tracing/span.decorator.js";

export * from "./context/correlation-id.service.js";
export * from "./context/request-context.service.js";

export * from "./propagation/w3c-propagator.js";
export * from "./propagation/kafka-propagator.js";
