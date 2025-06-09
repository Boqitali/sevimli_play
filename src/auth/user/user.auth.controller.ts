import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { UserAuthService } from "./user.auth.service";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { SignInDto } from "../dto/sign-in.dto";
import { Request, Response } from "express";

@Controller("auth")
export class UserAuthController {
  constructor(private readonly authService: UserAuthService) {}

  

  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInUser(signInDto, res);
  }

  @Get("logout")
  async logoutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutUser(req, res);
  }

  @Post("refresh-token")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenUser(req, res);
  }
}
