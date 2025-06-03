import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsDate } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { Video } from "../../video/entities/video.entity";

export class CreateLikeDto {
  @ApiProperty({ type: () => Video, description: "Layk qilingan video" })
  @IsNumber()
  videoId?: number;

  @ApiProperty({ type: () => User, description: "Layk bergan foydalanuvchi" })
  @IsNumber()
  userId?: number;

  @ApiProperty({
    example: "2025-06-03T12:00:00Z",
    description: "Layk qo'yilgan sana va vaqt",
  })
  @IsDate()
  @Type(() => Date)
  liked_at: Date;
}
