import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { UserAuthController } from "./user/user.auth.controller";
import { UserAuthService } from "./user/user.auth.service";
import { AdminModule } from "../admin/admin.module";
import { AdminAuthController } from "./admin/admin.auth.controller";
import { AdminAuthService } from "./admin/admin.auth.service";

@Module({
  imports: [JwtModule.register({ global: true }), UsersModule, AdminModule],

  controllers: [UserAuthController, AdminAuthController],
  providers: [UserAuthService, AdminAuthService],
})
export class AuthModule {}
