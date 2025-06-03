import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Video } from "../../video/entities/video.entity";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Comment {
  @ApiProperty({ example: 1, description: "Unikal comment ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Video, description: "Comment qilingan video" })
  @ManyToOne(() => Video, (video) => video.comment)
  @JoinColumn({ name: "videoId" })
  video: Video;

  @ApiProperty({
    type: () => User,
    description: "Comment yozgan foydalanuvchi",
  })
  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn({ name: "userId" })
  user: User;

  @ApiProperty({
    example: "Juda yaxshi video!",
    description: "Foydalanuvchi kommentariyasi",
  })
  @Column()
  comment: string;

  @ApiProperty({
    example: "2025-06-03T12:34:56Z",
    description: "Comment yozilgan sana va vaqt",
  })
  @CreateDateColumn()
  created_at: Date;
}
