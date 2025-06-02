import { IsInt, IsDate, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateWatchHistoryDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  videoId: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  watched_at: Date;
}
