import { IsNotEmpty, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
  @ApiProperty({
    example: "2025-06-03T10:15:30.000Z",
    description: "Foydalanuvchi obuna bo‘lgan vaqti",
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  subscribed_at: Date;

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
