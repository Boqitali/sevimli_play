import { PartialType } from "@nestjs/mapped-types";
import { CreatePlaylistVideoDto } from "./create-playlist_video.dto";
import { IsNumber } from "class-validator";

export class UpdatePlaylistVideoDto extends PartialType(
  CreatePlaylistVideoDto
) {
  @IsNumber()
  playListId: number;

  @IsNumber()
  videoId: number;
}
