import { IsNotEmpty, IsString, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChannelDto {
  @ApiProperty({
    example: "Sevimli Dasturchi",
    description: "Kanal nomi",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "Dasturlashga oid eng so'nggi videolar",
    description: "Kanal tavsifi",
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 1,
    description: "Kanal egasi bo;lgan foydalanuvchi",
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
