import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AdminAuthService } from "./admin.auth.service";
import { SignInDto } from "../dto/sign-in.dto";

@Controller("auth/admin")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("login")
  @HttpCode(200)
  async loginAdmin(
    @Body() loginAdminDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.loginAdmin(loginAdminDto, res);
  }

  @Get("logout")
  async logoutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.logoutAdmin(req, res);
  }

  @Post("refresh-token")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.refreshToken(req, res);
  }
}
