import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';
import { UsersService } from '../users/users.service';
import { VideoService } from '../video/video.service';
import { Category } from '../categories/entities/category.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, Video, Category]), MailModule],
  controllers: [LikesController],
  providers: [LikesService, UsersService, VideoService],
})
export class LikesModule {}
