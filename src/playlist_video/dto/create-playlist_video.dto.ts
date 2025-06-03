import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Video } from "../../video/entities/video.entity";
import { Playlist } from "../../playlists/entities/playlist.entity";

export class CreatePlaylistVideoDto {
  @ApiProperty({ type: () => Playlist, description: "Bog'langan Playlist" })
  @IsNumber()
  playListId: number;

  @ApiProperty({ type: () => Video, description: "Bog'langan Video" })
  @IsNumber()
  videoId: number;
}
