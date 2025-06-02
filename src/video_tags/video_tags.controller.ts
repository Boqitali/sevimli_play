import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoTagsService } from './video_tags.service';
import { CreateVideoTagDto } from './dto/create-video_tag.dto';
import { UpdateVideoTagDto } from './dto/update-video_tag.dto';

@Controller('video-tags')
export class VideoTagsController {
  constructor(private readonly videoTagsService: VideoTagsService) {}

  @Post()
  create(@Body() createVideoTagDto: CreateVideoTagDto) {
    return this.videoTagsService.create(createVideoTagDto);
  }

  @Get()
  findAll() {
    return this.videoTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoTagDto: UpdateVideoTagDto) {
    return this.videoTagsService.update(+id, updateVideoTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoTagsService.remove(+id);
  }
}
