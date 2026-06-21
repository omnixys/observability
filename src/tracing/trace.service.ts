import { TraceContextExtractor } from '../context/trace-context.extractor.js';
import { Injectable } from '@nestjs/common';
import { context, trace } from '@opentelemetry/api';

@Injectable()
export class TraceService {
  getSpan() {
    return trace.getSpan(context.active());
  }

  traceId() {
    return TraceContextExtractor.getTraceId() ?? undefined;
  }

  spanId() {
    return TraceContextExtractor.getSpanId() ?? undefined;
  }
}
