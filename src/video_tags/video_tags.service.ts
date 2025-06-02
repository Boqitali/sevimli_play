import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVideoTagDto } from "./dto/create-video_tag.dto";
import { UpdateVideoTagDto } from "./dto/update-video_tag.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "../video/entities/video.entity";
import { Tag } from "../tags/entities/tag.entity";
import { VideoTag } from "./entities/video_tag.entity";

@Injectable()
export class VideoTagsService {
  constructor(
    @InjectRepository(VideoTag)
    private readonly videoTagRepo: Repository<VideoTag>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>
  ) {}

  async create(createVideoTagDto: CreateVideoTagDto) {
    const video = await this.videoRepo.findOne({
      where: { id: createVideoTagDto.videoId },
    });
    if (!video) {
      throw new NotFoundException(
        `Video with id ${createVideoTagDto.videoId} not found`
      );
    }

    const tag = await this.tagRepo.findOne({
      where: { id: createVideoTagDto.tagId },
    });
    if (!tag) {
      throw new NotFoundException(
        `Tag with id ${createVideoTagDto.videoId} not found`
      );
    }

    return this.videoTagRepo.save({ ...createVideoTagDto, tag, video });
  }

  findAll() {
    return this.videoTagRepo.find({ relations: ["tag", "video"] });
  }

  findOne(id: number) {
    return this.videoTagRepo.findOne({
      where: { id },
      relations: ["tag", "video"],
    });
  }

  async update(id: number, updateVideoTagDto: UpdateVideoTagDto) {
    const tag = await this.videoTagRepo.findOne({ where: { id } });

    if (!tag) {
      throw new NotFoundException(`tag with ID ${id} not found`);
    }

    Object.assign(tag, updateVideoTagDto);
    return this.videoTagRepo.save(tag);
  }

  remove(id: number) {
    return this.videoTagRepo.delete({ id });
  }
}
