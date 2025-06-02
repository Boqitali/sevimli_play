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

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Video, (video) => video.comment)
  @JoinColumn({ name: "videoId" })
  video: Video;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
