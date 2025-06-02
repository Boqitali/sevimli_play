import { IsNumber } from "class-validator";

export class CreateVideoTagDto {
  @IsNumber()
  tagId: number;

  @IsNumber()
  videoId: number;
}
