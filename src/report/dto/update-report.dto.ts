import { PartialType } from "@nestjs/mapped-types";
import { CreateReportDto } from "./create-report.dto";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateReportDto extends PartialType(CreateReportDto) {
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
