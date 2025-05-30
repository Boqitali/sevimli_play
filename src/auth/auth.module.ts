import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { UserAuthController } from "./user/user.auth.controller";
import { UserAuthService } from "./user/user.auth.service";

@Module({
  imports: [JwtModule.register({ global: true }), UsersModule],

  controllers: [UserAuthController],
  providers: [UserAuthService],
})
export class AuthModule {}
