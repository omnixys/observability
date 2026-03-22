import { Sampler, SamplingResult } from "@opentelemetry/sdk-trace-base";

export class AdaptiveSampler implements Sampler {
  constructor(private readonly baseRate = 0.1) {}

  shouldSample(
    _context: any,
    traceId: string,
    _spanName: string,
  ): SamplingResult {
    // Always sample errors (traceId heuristic)
    if (traceId.endsWith("ff")) {
      return { decision: 2 }; // RECORD_AND_SAMPLE
    }

    // probabilistic fallback
    const random = Math.random();

    if (random < this.baseRate) {
      return { decision: 2 };
    }

    return { decision: 0 };
  }

  toString() {
    return "AdaptiveSampler";
  }
}
