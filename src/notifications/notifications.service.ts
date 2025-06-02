import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const user = await this.userRepo.findOne({
      where: { id: createNotificationDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createNotificationDto.userId} not found`
      );
    }

    return this.notificationRepo.save({ ...createNotificationDto, user });
  }

  findAll() {
    return this.notificationRepo.find({ relations: ["user"] });
  }

  async findOne(id: number) {
    const notification = await this.notificationRepo.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!notification) {
      throw new NotFoundException(`notification with id ${id} not found`);
    }

    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationRepo.findOne({ where: { id } });

    if (!notification) {
      throw new NotFoundException(`notification with ID ${id} not found`);
    }

    Object.assign(notification, updateNotificationDto);
    return this.notificationRepo.save(notification);
  }

  remove(id: number) {
    return this.notificationRepo.delete({ id });
  }
}
