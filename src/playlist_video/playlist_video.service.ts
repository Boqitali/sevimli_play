import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePlaylistVideoDto } from "./dto/create-playlist_video.dto";
import { UpdatePlaylistVideoDto } from "./dto/update-playlist_video.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "../video/entities/video.entity";
import { PlaylistVideo } from "./entities/playlist_video.entity";
import { Playlist } from "../playlists/entities/playlist.entity";

@Injectable()
export class PlaylistVideoService {
  constructor(
    @InjectRepository(PlaylistVideo)
    private readonly playListVideoRepo: Repository<PlaylistVideo>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>
  ) {}
  async create(createPlaylistVideoDto: CreatePlaylistVideoDto) {
    const video = await this.videoRepo.findOne({
      where: { id: createPlaylistVideoDto.videoId },
    });
    if (!video) {
      throw new NotFoundException(
        `video with id ${createPlaylistVideoDto.videoId} not found`
      );
    }

    const playlist = await this.playlistRepo.findOne({
      where: { id: createPlaylistVideoDto.playListId },
    });
    if (!playlist) {
      throw new NotFoundException(
        `playlist with id ${createPlaylistVideoDto.playListId} not found`
      );
    }
    return this.playListVideoRepo.save({
      ...createPlaylistVideoDto,
      video,
      playlist,
    });
  }

  findAll() {
    return this.playListVideoRepo.find({ relations: ["video", "playlist"] });
  }

  async findOne(id: number) {
    const playlistVideo = this.playListVideoRepo.findOne({
      where: { id },
      relations: ["video", "playlist"],
    });

    return playlistVideo;
  }

  async update(id: number, updatePlaylistVideoDto: UpdatePlaylistVideoDto) {
    const playlistVideo = await this.playListVideoRepo.findOne({ where: { id } });

    if (!playlistVideo) {
      throw new NotFoundException(`playlistVideo with ID ${id} not found`);
    }

    Object.assign(playlistVideo, updatePlaylistVideoDto);
    return this.playListVideoRepo.save(playlistVideo);
  }

  remove(id: number) {
    return this.playListVideoRepo.delete({ id });
  }
}
