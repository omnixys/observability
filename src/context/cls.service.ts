import { Injectable } from '@nestjs/common';
import { context } from '@opentelemetry/api';
import { AsyncLocalStorage } from 'node:async_hooks';

type Store = Map<string, unknown>;

@Injectable()
export class ClsService {
  private readonly storage = new AsyncLocalStorage<Store>();

  run(fn: () => void) {
    const activeContext = context.active();

    this.storage.run(new Map(), () => {
      // 🔥 OTEL Context wieder aktivieren
      context.with(activeContext, fn);
    });
  }

  set<T>(key: string, value: T) {
    const store = this.storage.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  get<T>(key: string): T | undefined {
    return this.storage.getStore()?.get(key) as T;
  }
}
