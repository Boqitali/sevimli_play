import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "../../video/entities/video.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class WatchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Video, (video) => video.watchHistory)
  @JoinColumn({ name: "videoId" })
  video: Video;

  @ManyToOne(() => User, (user) => user.watchHistory)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  watched_at: Date;
}
