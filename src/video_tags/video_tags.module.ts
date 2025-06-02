import { Module } from '@nestjs/common';
import { VideoTagsService } from './video_tags.service';
import { VideoTagsController } from './video_tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../tags/entities/tag.entity';
import { Video } from '../video/entities/video.entity';
import { TagsService } from '../tags/tags.service';
import { VideoService } from '../video/video.service';
import { VideoTag } from './entities/video_tag.entity';
import { Category } from '../categories/entities/category.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoTag, Tag, Video, Category, User])],
  controllers: [VideoTagsController],
  providers: [VideoTagsService, TagsService, VideoService],
})
export class VideoTagsModule {}
