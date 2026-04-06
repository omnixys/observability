export class ErrorClassifier {
  static classify(err: unknown): string {
    if (!err) return 'unknown';

    const e = err as any;

    if (e.status >= 500) return 'server_error';
    if (e.status >= 400) return 'client_error';

    return 'internal_error';
  }
}
