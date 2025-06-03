import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { Video } from "../../video/entities/video.entity";

export class CreateVideoTagDto {
  @ApiProperty({
    example: 1,
    description: "Teg ID raqami",
    type: User,
  })
  @IsNumber()
  tagId: number;

  @ApiProperty({
    example: 10,
    description: "Video ID raqami",
    type: Video,
  })
  @IsNumber()
  videoId: number;
}
