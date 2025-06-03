import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Playlist } from "./entities/playlist.entity";

@Controller("playlists")
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @ApiOperation({ summary: "Yangi playlist yaratish" })
  @ApiResponse({
    status: 201,
    description: "Playlist muvaffaqiyatli yaratildi",
    type: Playlist,
  })
  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }

  @ApiOperation({ summary: "Barcha playlistlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Playlistlar ro'yxati",
    type: [Playlist],
  })
  @Get()
  findAll() {
    return this.playlistsService.findAll();
  }

  @ApiOperation({ summary: "ID orqali bitta playlistni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan playlist",
    type: Playlist,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.playlistsService.findOne(+id);
  }

  @ApiOperation({ summary: "Playlistni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Playlist yangilandi",
    type: Playlist,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto
  ) {
    return this.playlistsService.update(+id, updatePlaylistDto);
  }

  @ApiOperation({ summary: "Playlistni id bilan o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete user",
    type: Playlist,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.playlistsService.remove(+id);
  }
}
