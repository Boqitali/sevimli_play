import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();
    const user = req.user;

    if (user.role !== "user" && user.role !== "admin") {
      throw new ForbiddenException({
        message: "Faqat oddiy foydalanuvchilar uchun ruxsat berilgan",
      });
    }

    return true;
  }
}
