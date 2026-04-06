import { CORRELATION_ID_KEY } from '../core/observability.constants.js';
import { ClsService } from './cls.service.js';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CorrelationIdService {
  constructor(private readonly cls: ClsService) {}

  get(): string | undefined {
    return this.cls.get<string>(CORRELATION_ID_KEY);
  }

  set(id: string) {
    this.cls.set(CORRELATION_ID_KEY, id);
  }

  generate(): string {
    const id = randomUUID();
    this.set(id);
    return id;
  }
}
