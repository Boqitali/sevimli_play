import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoTagsService } from './video_tags.service';
import { CreateVideoTagDto } from './dto/create-video_tag.dto';
import { UpdateVideoTagDto } from './dto/update-video_tag.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VideoTag } from './entities/video_tag.entity';

@Controller("video-tags")
export class VideoTagsController {
  constructor(private readonly videoTagsService: VideoTagsService) {}

  @ApiOperation({ summary: "Yangi video tag yaratish" })
  @ApiResponse({
    status: 201,
    description: "Video tag yaratildi.",
    type: VideoTag,
  })
  @Post()
  create(@Body() createVideoTagDto: CreateVideoTagDto) {
    return this.videoTagsService.create(createVideoTagDto);
  }

  @ApiOperation({ summary: "Barcha video taglarni olish" })
  @ApiResponse({
    status: 200,
    description: "Video taglar ro'yxati.",
    type: [VideoTag],
  })
  @Get()
  findAll() {
    return this.videoTagsService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha video tagni olish" })
  @ApiResponse({
    status: 200,
    description: "Video tag topildi.",
    type: VideoTag,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.videoTagsService.findOne(+id);
  }

  @ApiOperation({ summary: "Video tagni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Video tag yangilandi.",
    type: VideoTag,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateVideoTagDto: UpdateVideoTagDto
  ) {
    return this.videoTagsService.update(+id, updateVideoTagDto);
  }

  @ApiOperation({ summary: "Video tagni o'chirish" })
  @ApiResponse({ status: 200, description: "Video tag o'chirildi." })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.videoTagsService.remove(+id);
  }
}
