import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaylistDto {
  @ApiProperty({
    example: "Yaxshi ko'rgan kinolarim",
    description: "Playlist nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Userning ID raqami",
    description: "Playlist egasi bo'lgan foydalanuvchi",
  })
  @IsNumber()
  userId: number;
}
