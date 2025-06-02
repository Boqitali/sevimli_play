import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWatchHistoryDto } from "./dto/create-watch_history.dto";
import { UpdateWatchHistoryDto } from "./dto/update-watch_history.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WatchHistory } from "./entities/watch_history.entity";
import { User } from "../users/entities/user.entity";
import { Video } from "../video/entities/video.entity";

@Injectable()
export class WatchHistoryService {
  constructor(
    @InjectRepository(WatchHistory)
    private readonly watchHistoryRepo: Repository<WatchHistory>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}
  async create(createWatchHistoryDto: CreateWatchHistoryDto) {
    const user = await this.userRepo.findOne({
      where: { id: createWatchHistoryDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createWatchHistoryDto.userId} not found`
      );
    }

    const video = await this.videoRepo.findOne({
      where: { id: createWatchHistoryDto.videoId },
    });
    if (!video) {
      throw new NotFoundException(
        `video with id ${createWatchHistoryDto.videoId} not found`
      );
    }
    return this.watchHistoryRepo.save({
      ...createWatchHistoryDto,
      user,
      video,
    });
  }

  findAll() {
    return this.watchHistoryRepo.find({ relations: ["user", "video"] });
  }

  findOne(id: number) {
    return this.watchHistoryRepo.findOne({
      where: { id },
      relations: ["user", "video"],
    });
  }

  async update(id: number, updateWatchHistoryDto: UpdateWatchHistoryDto) {
    const watchHistory = await this.watchHistoryRepo.findOne({ where: { id } });

    if (!watchHistory) {
      throw new NotFoundException(`watchHistory with ID ${id} not found`);
    }

    Object.assign(watchHistory, updateWatchHistoryDto);
    return this.watchHistoryRepo.save(watchHistory);
  }

  remove(id: number) {
    return this.watchHistoryRepo.delete({ id });
  }
}
