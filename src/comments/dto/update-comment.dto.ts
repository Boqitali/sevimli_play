import { PartialType } from "@nestjs/mapped-types";
import { CreateCommentDto } from "./create-comment.dto";
import { IsDate, IsEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsNumber()
  videoId: number;

  @IsNumber()
  userId: number;

  @IsString()
  @IsEmpty()
  comment: string;

  @IsDate()
  created_at: Date;
}
