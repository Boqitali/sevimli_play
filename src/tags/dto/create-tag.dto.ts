import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
  @ApiProperty({
    example: "drama",
    description: "Tafsilotlari",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
