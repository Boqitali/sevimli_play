import { PartialType } from "@nestjs/mapped-types";
import { CreateLikeDto } from "./create-like.dto";
import { IsNumber, IsDate } from "class-validator";

export class UpdateLikeDto extends PartialType(CreateLikeDto) {
  @IsNumber()
  videoId?: number;

  @IsNumber()
  userId?: number;

  @IsDate()
  liked_at: Date;
}
