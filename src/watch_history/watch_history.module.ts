import { Module } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { WatchHistoryController } from './watch_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchHistory } from './entities/watch_history.entity';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';
import { UsersService } from '../users/users.service';
import { VideoService } from '../video/video.service';
import { Category } from '../categories/entities/category.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([WatchHistory, User, Video, Category]), MailModule],
  controllers: [WatchHistoryController],
  providers: [WatchHistoryService, UsersService, VideoService],
})
export class WatchHistoryModule {}
