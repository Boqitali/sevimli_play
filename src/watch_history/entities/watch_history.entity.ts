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
export class WatchHistory {
  @ApiProperty({
    example: 1,
    description: "Tarix yozuvining noyob ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 5,
    description: "Tomosha qilingan video ID raqami",
    type: () => Video,
  })
  @ManyToOne(() => Video, (video) => video.watchHistory)
  @JoinColumn({ name: "videoId" })
  video: Video;

  @ApiProperty({
    example: 2,
    description: "Videoni tomosha qilgan foydalanuvchi ID raqami",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.watchHistory)
  @JoinColumn({ name: "userId" })
  user: User;

  @ApiProperty({
    example: "2024-06-03T12:34:56.789Z",
    description: "Video tomosha qilingan vaqt",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  watched_at: Date;
}
