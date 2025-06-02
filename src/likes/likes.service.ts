import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "../video/entities/video.entity";
import { User } from "../users/entities/user.entity";
import { Like } from "./entities/like.entity";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createLikeDto: CreateLikeDto) {
    const user = await this.userRepo.findOne({
      where: { id: createLikeDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createLikeDto.userId} not found`
      );
    }

    const video = await this.videoRepo.findOne({
      where: { id: createLikeDto.videoId },
    });
    if (!video) {
      throw new NotFoundException(
        `video with id ${createLikeDto.videoId} not found`
      );
    }
    return this.likeRepo.save({...createLikeDto, user, video});
  }

  findAll() {
    return this.likeRepo.find({ relations: ["user", "video"] });
  }

  findOne(id: number) {
    return this.likeRepo.findOne({
      where: { id },
      relations: ["user", "video"],
    });
  }

  async update(id: number, updateLikeDto: UpdateLikeDto) {
    const like = await this.likeRepo.findOne({ where: { id } });

    if (!like) {
      throw new NotFoundException(`like with ID ${id} not found`);
    }

    Object.assign(like, updateLikeDto);
    return this.likeRepo.save(like);
  }

  remove(id: number) {
    return this.likeRepo.delete({ id });
  }
}
