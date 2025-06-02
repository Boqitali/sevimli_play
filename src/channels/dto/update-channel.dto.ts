import { PartialType } from "@nestjs/mapped-types";
import { CreateChannelDto } from "./create-channel.dto";
import { IsNotEmpty, IsString, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";

export class UpdateChannelDto extends PartialType(CreateChannelDto) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
