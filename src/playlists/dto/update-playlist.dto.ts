import { PartialType } from "@nestjs/mapped-types";
import { CreatePlaylistDto } from "./create-playlist.dto";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  userId: number;
}
