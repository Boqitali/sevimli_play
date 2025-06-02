import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "../../video/entities/video.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  reported_at: Date;

  @ManyToOne(() => Video, (video) => video.report)
  @JoinColumn({ name: "videoId" })
  video: Video;

  @ManyToOne(() => User, (user) => user.report)
  @JoinColumn({ name: "userId" })
  user: User;
}
