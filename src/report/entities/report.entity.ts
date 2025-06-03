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
export class Report {
  @ApiProperty({
    example: 1,
    description: "Report ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Noto'g'ri kontent",
    description: "Shikoyat sababi",
  })
  @Column()
  reason: string;

  @ApiProperty({
    example: "2025-06-03T14:23:45.000Z",
    description: "Shikoyat berilgan vaqt",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  reported_at: Date;

  @ApiProperty({
    description: "Shikoyat berilgan video",
    type: () => Video,
  })
  @ManyToOne(() => Video, (video) => video.report)
  @JoinColumn({ name: "videoId" })
  video: Video;

  @ApiProperty({
    description: "Shikoyatni bergan foydalanuvchi",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.report)
  @JoinColumn({ name: "userId" })
  user: User;
}
