import { IsInt, IsDate, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Video } from "../../video/entities/video.entity";
import { User } from "../../users/entities/user.entity";

export class CreateWatchHistoryDto {
  @ApiProperty({
    example: 2,
    description: "Videoni tomosha qilgan foydalanuvchi ID raqami",
    type: () => User,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 5,
    description: "Tomosha qilingan video ID raqami",
    type: () => Video,
  })
  @IsInt()
  @IsNotEmpty()
  videoId: number;

  @ApiProperty({
    example: "2024-06-03T12:34:56.789Z",
    description: "Video tomosha qilingan vaqt",
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  watched_at: Date;
}
