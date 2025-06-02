import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { Video } from "../video/entities/video.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userRepo.findOne({
      where: { id: createCommentDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createCommentDto.userId} not found`
      );
    }

    const video = await this.videoRepo.findOne({
      where: { id: createCommentDto.videoId },
    });
    if (!video) {
      throw new NotFoundException(
        `video with id ${createCommentDto.videoId} not found`
      );
    }
    return this.commentRepo.save({ ...createCommentDto, user, video });
  }

  findAll() {
    return this.commentRepo.find({ relations: ["user", "video"] });
  }

  findOne(id: number) {
    return this.commentRepo.findOne({
      where: { id },
      relations: ["user", "video"],
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepo.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    Object.assign(comment, updateCommentDto);
    return this.commentRepo.save(comment);
  }

  remove(id: number) {
    return this.commentRepo.delete({ id });
  }
}
