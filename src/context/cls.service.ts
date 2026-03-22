import { AsyncLocalStorage } from "node:async_hooks";
import { Injectable } from "@nestjs/common";

type Store = Map<string, unknown>;

@Injectable()
export class ClsService {
  private readonly storage = new AsyncLocalStorage<Store>();

  run(fn: () => void) {
    this.storage.run(new Map(), fn);
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
