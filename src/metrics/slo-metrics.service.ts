export class SloMetricsService {
  private errors = 0;
  private total = 0;

  recordSuccess() {
    this.total++;
  }

  recordError() {
    this.total++;
    this.errors++;
  }

  errorRate() {
    if (this.total === 0) return 0;
    return this.errors / this.total;
  }
}
