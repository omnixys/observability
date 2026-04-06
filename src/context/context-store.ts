import { context, Context } from '@opentelemetry/api';

export class ContextStore {
  static capture(): Context {
    return context.active();
  }

  static run<T>(ctx: Context, fn: () => Promise<T>): Promise<T> {
    return context.with(ctx, fn);
  }
}
