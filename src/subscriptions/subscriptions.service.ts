import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Subscription } from "./entities/subscription.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Channel } from "../channels/entities/channel.entity";

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subsciptionRepo: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Channel)
    private readonly channelRepo: Repository<Channel>
  ) {}
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const user = await this.userRepo.findOne({
      where: { id: createSubscriptionDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createSubscriptionDto.userId} not found`
      );
    }

    const channel = await this.channelRepo.findOne({
      where: { id: createSubscriptionDto.channelId },
    });
    if (!channel) {
      throw new NotFoundException(
        `channel with id ${createSubscriptionDto.channelId} not found`
      );
    }
    return this.subsciptionRepo.save({
      ...createSubscriptionDto,
      channel,
      user,
    });
  }

  findAll() {
    return this.subsciptionRepo.find({ relations: ["channel", "user"] });
  }

  findOne(id: number) {
    return this.channelRepo.findOne({ relations: ["channel", "user"] });
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subsciption = await this.subsciptionRepo.findOne({ where: { id } });

    if (!subsciption) {
      throw new NotFoundException(`subsciption with ID ${id} not found`);
    }

    Object.assign(subsciption, updateSubscriptionDto);
    return this.subsciptionRepo.save(subsciption);
  }

  remove(id: number) {
    return this.subsciptionRepo.delete({ id });
  }
}
