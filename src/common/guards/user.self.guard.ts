import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class UserSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();
    const user = req.user;

    // Foydalanuvchi roli "user" bo'lishi kerak
    if (user.role !== "user" && user.role !== "admin") {
      throw new ForbiddenException({
        message: "Faqat oddiy foydalanuvchi ruxsat etilgan",
      });
    }
    
    // Agar user role admin bo‘lsa, har qanday ID ga kira oladi
    if (user.role === "admin") {
      return true;
    }

    // Foydalanuvchi faqat o‘zining ID si bo‘yicha ma’lumotga kirishi mumkin
    if (user.id != req.params.id) {
      throw new ForbiddenException({
        message: "Faqat o'z ma'lumotlaringizga ruxsat berilgan",
      });
    }

    return true;
  }
}
