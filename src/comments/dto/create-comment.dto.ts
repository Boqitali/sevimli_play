import { IsDate, IsEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
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
