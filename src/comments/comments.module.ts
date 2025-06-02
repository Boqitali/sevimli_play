import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';
import { UsersService } from '../users/users.service';
import { VideoService } from '../video/video.service';
import { Category } from '../categories/entities/category.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Video, Category]), MailModule],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, VideoService],
})
export class CommentsModule {}
