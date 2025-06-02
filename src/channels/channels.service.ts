import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Channel } from "./entities/channel.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepo: Repository<Channel>,
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async create(createChannelDto: CreateChannelDto) {
    const user = await this.userRepo.findOne({
      where: { id: createChannelDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createChannelDto.userId} not found`
      );
    }

    return this.channelRepo.save({ ...createChannelDto, user });
  }

  findAll() {
    return this.channelRepo.find({ relations: ["user"] });
  }

  async findOne(id: number) {
    const channel = this.channelRepo.findOne({
      where: { id },
      relations: ["user"],
    });

    return channel;
  }

  async update(id: number, updateChannelDto: UpdateChannelDto) {
    const channel = await this.channelRepo.findOne({ where: { id } });

    if (!channel) {
      throw new NotFoundException(`channel with ID ${id} not found`);
    }

    Object.assign(channel, updateChannelDto);
    return this.channelRepo.save(channel);
  }

  remove(id: number) {
    return this.channelRepo.delete({ id });
  }
}
