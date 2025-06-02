import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  videoId: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  reported_at: Date;
}
