import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheMetricsService {
  private hits = 0;
  private misses = 0;
  private writes = 0;
  private deletes = 0;
  private errors = 0;

  hit(): void {
    this.hits += 1;
  }

  miss(): void {
    this.misses += 1;
  }

  write(): void {
    this.writes += 1;
  }

  delete(): void {
    this.deletes += 1;
  }

  error(): void {
    this.errors += 1;
  }

  snapshot() {
    const reads = this.hits + this.misses;

    return {
      hits: this.hits,
      misses: this.misses,
      writes: this.writes,
      deletes: this.deletes,
      errors: this.errors,
      hitRate: reads === 0 ? 0 : this.hits / reads,
    };
  }
}
