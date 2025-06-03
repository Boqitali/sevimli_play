import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Video } from "../../video/entities/video.entity";
import { User } from "../../users/entities/user.entity";

export class CreateReportDto {
  @ApiProperty({
    example: "Noto'g'ri kontent",
    description: "Shikoyat sababi",
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({
    description: "Shikoyatni bergan foydalanuvchi",
    type: () => User,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: "Shikoyat berilgan video",
    type: () => Video,
  })
  @IsInt()
  @IsNotEmpty()
  videoId: number;
}
