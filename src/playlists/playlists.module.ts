import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, User]), UsersModule],
  controllers: [PlaylistsController],
  providers: [PlaylistsService], //UsersService
  exports: [PlaylistsService],
})
export class PlaylistsModule {}
