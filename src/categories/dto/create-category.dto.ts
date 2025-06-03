import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Komediya",
    description: "Kategoriya nomi",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "Kuldiradigan videolar toifasi",
    description: "Kategoriya tavsifi",
  })
  @IsNotEmpty()
  @IsString()
  desciption: string;
}
