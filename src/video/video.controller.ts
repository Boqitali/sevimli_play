import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Video } from "./entities/video.entity";
import { Roles } from "../common/decorators/rols.auth-decorator";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@Controller("video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Videolarni qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Create video",
    type: Video,
  })
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha videolarni olish" })
  @ApiResponse({
    status: 200,
    description: "Videolar ro'yxati muvaffaqiyatli olindi",
    type: [Video],
  })
  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Bitta videoni olish" })
  @ApiResponse({
    status: 200,
    description: "ID bo'yicha video topildi",
    type: Video,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.videoService.findOne(+id);
  }

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Videoni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Video muvaffaqiyatli yangilandi",
    type: Video,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Videoni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Video muvaffaqiyatli o'chirildi",
    type: Video,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.videoService.remove(+id);
  }
}
