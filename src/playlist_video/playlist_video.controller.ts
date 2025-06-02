import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistVideoService } from './playlist_video.service';
import { CreatePlaylistVideoDto } from './dto/create-playlist_video.dto';
import { UpdatePlaylistVideoDto } from './dto/update-playlist_video.dto';

@Controller('playlist-video')
export class PlaylistVideoController {
  constructor(private readonly playlistVideoService: PlaylistVideoService) {}

  @Post()
  create(@Body() createPlaylistVideoDto: CreatePlaylistVideoDto) {
    return this.playlistVideoService.create(createPlaylistVideoDto);
  }

  @Get()
  findAll() {
    return this.playlistVideoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistVideoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistVideoDto: UpdatePlaylistVideoDto) {
    return this.playlistVideoService.update(+id, updatePlaylistVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistVideoService.remove(+id);
  }
}
