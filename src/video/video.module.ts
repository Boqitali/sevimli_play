import { Module } from "@nestjs/common";
import { VideoService } from "./video.service";
import { VideoController } from "./video.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entities/video.entity";
import { Category } from "../categories/entities/category.entity";
import { CategoriesService } from "../categories/categories.service";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([Video, Category, User])],
  controllers: [VideoController],
  providers: [VideoService, CategoriesService, UsersService],
  exports: [VideoService],
})
export class VideoModule {}
