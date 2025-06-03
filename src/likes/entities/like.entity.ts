import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Video } from "../../video/entities/video.entity";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Like {
  @ApiProperty({ example: 1, description: "Layk ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Video, description: "Layk qilingan video" })
  @ManyToOne(() => Video, (video) => video.like)
  @JoinColumn({ name: "videoId" })
  video: Video;

  @ApiProperty({ type: () => User, description: "Layk bergan foydalanuvchi" })
  @ManyToOne(() => User, (user) => user.like)
  @JoinColumn({ name: "userId" })
  user: User;

  @ApiProperty({
    example: "2025-06-03T12:00:00Z",
    description: "Layk qo'yilgan sana va vaqt",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  liked_at: Date;
}
