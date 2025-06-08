import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Like } from './entities/like.entity';
import { Roles } from '../common/decorators/rols.auth-decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserGuard } from '../common/guards/user.guard';
import { UserSelfGuard } from '../common/guards/user.self.guard';

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Yangi like yaratish" })
  @ApiResponse({ status: 201, description: "Like yaratildi", type: Like })
  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Roles("user", "admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Barcha like-larni olish" })
  @ApiResponse({ status: 200, description: "Like-lar royxati", type: [Like] })
  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Roles("user", "admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "ID orqali like-ni olish" })
  @ApiResponse({ status: 200, description: "Topilgan like", type: Like })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.likesService.findOne(+id);
  }

  @UseGuards(UserGuard, UserSelfGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Like ma'lumotini yangilash" })
  @ApiResponse({ status: 200, description: "Like yangilandi", type: Like })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Roles("user", "admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Like-ni o'chirish" })
  @ApiResponse({ status: 200, description: "Like o'chirildi" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.likesService.remove(+id);
  }
}
