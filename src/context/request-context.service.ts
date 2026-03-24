import { Injectable } from "@nestjs/common";
import { ClsService } from "./cls.service.js";

@Injectable()
export class RequestContextService {
  constructor(private readonly cls: ClsService) {}

  setUser(userId: string) {
    this.cls.set("user_id", userId);
  }

  getUser(): string | undefined {
    return this.cls.get<string>("user_id");
  }

  setTenant(tenantId: string) {
    this.cls.set("tenant_id", tenantId);
  }

  getTenant(): string | undefined {
    return this.cls.get<string>("tenant_id");
  }
}
