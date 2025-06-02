import { Type } from "class-transformer";
import { IsNumber, IsDate } from "class-validator";

export class CreateLikeDto {
  @IsNumber()
  videoId?: number;

  @IsNumber()
  userId?: number;

  @IsDate()
  @Type(() => Date)
  liked_at: Date;
}
