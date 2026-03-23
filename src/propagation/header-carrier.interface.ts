export interface HeaderCarrier {
  get(key: string): string | undefined;
  set(key: string, value: string): void;
}
