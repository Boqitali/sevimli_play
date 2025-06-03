import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Like } from './entities/like.entity';

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: "Yangi like yaratish" })
  @ApiResponse({ status: 201, description: "Like yaratildi", type: Like })
  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @ApiOperation({ summary: "Barcha like-larni olish" })
  @ApiResponse({ status: 200, description: "Like-lar royxati", type: [Like] })
  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @ApiOperation({ summary: "ID orqali like-ni olish" })
  @ApiResponse({ status: 200, description: "Topilgan like", type: Like })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.likesService.findOne(+id);
  }

  @ApiOperation({ summary: "Like ma'lumotini yangilash" })
  @ApiResponse({ status: 200, description: "Like yangilandi", type: Like })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @ApiOperation({ summary: "Like-ni o'chirish" })
  @ApiResponse({ status: 200, description: "Like o'chirildi" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.likesService.remove(+id);
  }
}
