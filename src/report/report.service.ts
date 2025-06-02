import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Report } from "./entities/report.entity";
import { Video } from "../video/entities/video.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}
  async create(createReportDto: CreateReportDto) {
    const user = await this.userRepo.findOne({
      where: { id: createReportDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createReportDto.userId} not found`
      );
    }

    const video = await this.videoRepo.findOne({
      where: { id: createReportDto.videoId },
    });
    if (!video) {
      throw new NotFoundException(
        `video with id ${createReportDto.videoId} not found`
      );
    }
    return this.reportRepo.save({ ...createReportDto, user, video });
  }

  findAll() {
    return this.reportRepo.find({ relations: ["user", "video"] });
  }

  findOne(id: number) {
    return this.reportRepo.findOne({
      where: {id},
      relations: ["user", "video"] });;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.reportRepo.findOne({ where: { id } });

    if (!report) {
      throw new NotFoundException(`report with ID ${id} not found`);
    }

    Object.assign(report, updateReportDto);
    return this.reportRepo.save(report);;
  }

  remove(id: number) {
    return this.reportRepo.delete({id});
  }
}
