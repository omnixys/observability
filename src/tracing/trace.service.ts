import { Injectable } from "@nestjs/common";
import { context, trace } from "@opentelemetry/api";

@Injectable()
export class TraceService {
  getSpan() {
    return trace.getSpan(context.active());
  }

  traceId() {
    return this.getSpan()?.spanContext().traceId;
  }

  spanId() {
    return this.getSpan()?.spanContext().spanId;
  }
}
