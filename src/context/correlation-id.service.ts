import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { ClsService } from "./cls.service.js";
import { CORRELATION_ID_KEY } from "../core/observability.constants.js";

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
