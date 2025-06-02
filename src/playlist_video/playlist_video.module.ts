import { Category } from './../categories/entities/category.entity';
import { Module } from '@nestjs/common';
import { PlaylistVideoService } from './playlist_video.service';
import { PlaylistVideoController } from './playlist_video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from '../playlists/entities/playlist.entity';
import { PlaylistVideo } from './entities/playlist_video.entity';
import { Video } from '../video/entities/video.entity';
import { PlaylistsService } from '../playlists/playlists.service';
import { VideoService } from '../video/video.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistVideo, Playlist, Video, Category,User])],
  controllers: [PlaylistVideoController],
  providers: [PlaylistVideoService, PlaylistsService, VideoService],
})
export class PlaylistVideoModule {}
