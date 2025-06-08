import { IsNotEmpty, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
  
  @ApiProperty({
    example: "User ID raqami",
    description: "Obuna bo'lgan foydalanuvchi",
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: "Obuna bolgan kanal",
    description: "Obuna bo'lgan kanal",
  })
  @IsNotEmpty()
  @IsInt()
  channelId: number;
}
