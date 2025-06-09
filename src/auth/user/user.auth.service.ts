import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/entities/user.entity";

import * as bcrypt from "bcrypt";
import { SignInDto } from "../dto/sign-in.dto";
import { Request, Response } from "express";
import { CreateUserDto } from "../../users/dto/create-user.dto";

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      username: user.username,
      role: "user"
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }



  async signInUser(signInDto: SignInDto, res: Response) {
    const user = await this.userService.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException("email yoki parol xato");
    }
    if(!user.is_active){
      throw new BadRequestException("Avval emailli tasdiqlang!")
    }

    const validPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("email yoki parol xato");
    }

    const tokens = await this.generateToken(user);

    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    user.refresh_token = hashed_refresh_token;
    await this.userService.save(user);

    return {
      message: "student logged successfully",
      token: tokens.accessToken,
    };
  }

  async signOutUser(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    res.clearCookie("refresh-token", {
      httpOnly: true,
    });

    user.refresh_token = "";
    await this.userService.save(user);

    return {
      message: "user logged out",
    };
  }

  async refreshTokenUser(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const user = await this.userService.findByEmail(payload.email);

    if (!user) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    const tokens = await this.generateToken(user);

    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    user.refresh_token = hashed_refresh_token;
    await this.userService.save(user);

    return {
      message: "Refresh token yangilandi",
      token: tokens.accessToken,
    };
  }
}
