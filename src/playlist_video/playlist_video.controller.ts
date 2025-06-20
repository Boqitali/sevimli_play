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
import { PlaylistVideoService } from "./playlist_video.service";
import { CreatePlaylistVideoDto } from "./dto/create-playlist_video.dto";
import { UpdatePlaylistVideoDto } from "./dto/update-playlist_video.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PlaylistVideo } from "./entities/playlist_video.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { UserGuard } from "../common/guards/user.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { UserSelfGuard } from "../common/guards/user.self.guard";

@Controller("playlist-video")
export class PlaylistVideoController {
  constructor(private readonly playlistVideoService: PlaylistVideoService) {}

  @UseGuards(AuthGuard, UserGuard)
  @ApiOperation({ summary: "Playlistga video qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Video playlistga qo'shildi",
    type: PlaylistVideo,
  })
  @Post()
  create(@Body() createPlaylistVideoDto: CreatePlaylistVideoDto) {
    return this.playlistVideoService.create(createPlaylistVideoDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "Barcha playlist-video bog'lanishlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Bog'lanishlar ro'yxati",
    type: [PlaylistVideo],
  })
  @Get()
  findAll() {
    return this.playlistVideoService.findAll();
  }

  @UseGuards(AuthGuard, UserSelfGuard)
  @ApiOperation({ summary: "ID orqali playlist-video bog'lanishini olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan bog'lanish",
    type: PlaylistVideo,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.playlistVideoService.findOne(+id);
  }

  @UseGuards(AuthGuard, UserSelfGuard)
  @ApiOperation({ summary: "Playlist-video bog'lanishini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Bog'lanish yangilandi",
    type: PlaylistVideo,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePlaylistVideoDto: UpdatePlaylistVideoDto
  ) {
    return this.playlistVideoService.update(+id, updatePlaylistVideoDto);
  }

  @UseGuards(AuthGuard, UserSelfGuard)
  @ApiOperation({ summary: "Playlist-video bog'lanishini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Bog'lanish o'chirildi",
    type: PlaylistVideo,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.playlistVideoService.remove(+id);
  }
}
