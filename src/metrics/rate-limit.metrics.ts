import { Injectable } from '@nestjs/common';

export class RateLimitMetrics {
  private hits = new Map<string, number>();

  hit(key: string) {
    this.hits.set(key, (this.hits.get(key) ?? 0) + 1);
  }

  get(key: string) {
    return this.hits.get(key) ?? 0;
  }
}
