import { PartialType } from "@nestjs/mapped-types";
import { CreateVideoTagDto } from "./create-video_tag.dto";
import { IsNumber } from "class-validator";

export class UpdateVideoTagDto extends PartialType(CreateVideoTagDto) {
  @IsNumber()
  tagId: number;

  @IsNumber()
  videoId: number;
}
