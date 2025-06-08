
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AdminSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user?.is_creator) {
      if (user?.role != "admin") {
        throw new ForbiddenException({
          message: "Ruxsat etilmagan foydalanuvchi",
        });
      }
      if (user.id != req.params.id) {
        throw new ForbiddenException({
          message: "Ruxsat etilmagan foydalanuvchi",
        });
      }
      
    }
    return true;
  }
}