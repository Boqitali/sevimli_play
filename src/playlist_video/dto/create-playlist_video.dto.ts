import { IsNumber } from "class-validator";

export class CreatePlaylistVideoDto {
  @IsNumber()
  playListId: number;

  @IsNumber()
  videoId: number;
}
