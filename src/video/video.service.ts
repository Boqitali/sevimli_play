import { CategoriesController } from './../categories/categories.controller';
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Video } from "./entities/video.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Category } from "../categories/entities/category.entity";

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  
  async create(createVideoDto: CreateVideoDto) {
    const user = await this.userRepo.findOne({
      where: { id: createVideoDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createVideoDto.userId} not found`
      );
    }

    const category = await this.categoryRepo.findOne({
      where: { id: createVideoDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `category with id ${createVideoDto.categoryId} not found`
      );
    }
    return this.videoRepo.save({...createVideoDto, user, category});
  }

  findAll() {
    return this.videoRepo.find({relations: ["user", "category"]});
  }

  async findOne(id: number) {
    const video = await this.videoRepo.findOne({
      where: { id },
      relations: ["user", "category"],
    });
    if (!video) {
      throw new NotFoundException(`video with id ${id} not found`);
    }
    
    return video;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return this.videoRepo.preload({id, ...updateVideoDto});
  }

  remove(id: number) {
    return this.videoRepo.delete({id});
  }
}
