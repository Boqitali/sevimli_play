import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../../admin/entities/admin.entity";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { SignInDto } from "../dto/sign-in.dto";
import { AdminService } from "../../admin/admin.service";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      adminname: admin.username,
      email: admin.email,
      is_creator: admin.is_creator,
      role: "admin"
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return { accessToken, refreshToken };
  }

  async loginAdmin(signInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findByEmail(signInDto.email);

    if (!admin) {
      throw new UnauthorizedException("email yoki parol xato");
    }

    const validPassword = await bcrypt.compare(
      signInDto.password,
      admin.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("email yoki parol xato");
    }

    const tokens = await this.generateToken(admin);

    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    admin.refresh_token = hashed_refresh_token;
    await this.adminService.save(admin);

    return {
      message: "admin logged successfully",
      token: tokens.accessToken,
    };
  }

  async logoutAdmin(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const admin = await this.adminService.findByEmail(payload.email);

    if (!admin) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    res.clearCookie("refresh-token", {
      httpOnly: true,
    });

    admin.refresh_token = "";
    await this.adminService.save(admin);

    return {
      message: "admin logged out",
    };
  }

  async refreshToken(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const admin = await this.adminService.findByEmail(payload.email);

    if (!admin) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    const tokens = await this.generateToken(admin);

    res.cookie("refresh-token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    admin.refresh_token = hashed_refresh_token;
    await this.adminService.save(admin);

    return {
      message: "Refresh token yangilandi",
      token: tokens.accessToken,
    };
  }
}
