import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Video } from "../../video/entities/video.entity";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";

export class CreateCommentDto {
  @ApiProperty({ type: () => Video, description: "Comment qilingan video" })
  @IsNumber()
  videoId: number;

  @ApiProperty({
    type: () => User,
    description: "Comment yozgan foydalanuvchi",
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: "Juda yaxshi video!",
    description: "Foydalanuvchi kommentariyasi",
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
