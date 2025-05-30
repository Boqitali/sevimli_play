import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./entities/playlist.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}
  async create(createPlaylistDto: CreatePlaylistDto) {
    const user = await this.userRepo.findOne({
      where: { id: createPlaylistDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id ${createPlaylistDto.userId} not found`
      );
    }

    const playlist = this.playlistRepo.create({
      ...createPlaylistDto,
      user,
    });

    return this.playlistRepo.save(playlist);
  }

  findAll() {
    return this.playlistRepo.find({ relations: ["user"] });
  }

  async findOne(id: number) {
    const playlist = await this.playlistRepo.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!playlist) {
      throw new NotFoundException(`playlist with id ${id} not found`);
    }
    return playlist;
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.findOne(id);
    const updated = Object.assign(playlist, updatePlaylistDto);
    return this.playlistRepo.save(updated);
  }

  async remove(id: number) {
    const playlist = await this.findOne(id);
    await this.playlistRepo.remove(playlist);
  }
}
