import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Category } from "../../categories/entities/category.entity";
import { WatchHistory } from "../../watch_history/entities/watch_history.entity";
import { Report } from "../../report/entities/report.entity";
import { Like } from "../../likes/entities/like.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { VideoTag } from "../../video_tags/entities/video_tag.entity";
import { PlaylistVideo } from "../../playlist_video/entities/playlist_video.entity";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  thumbnail_url: string;

  @Column()
  views: number;

  @UpdateDateColumn()
  uploaded_at: Date;

  @Column()
  country_movie: string;

  @ManyToOne(() => Category, (category) => category.video)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToOne(() => User, (user) => user.video)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.video)
  watchHistory: WatchHistory[];

  @OneToMany(() => Report, (report) => report.video)
  report: Report[];

  @OneToMany(() => Comment, (comment) => comment.video)
  comment: Comment[];

  @OneToMany(() => Like, (like) => like.video)
  like: Like[];

  @OneToMany(() => VideoTag, (videoTag) => videoTag.video)
  videoTag: VideoTag[];

  @OneToMany(() => PlaylistVideo, (playlistVideo) => playlistVideo.video)
  playlistVideo: PlaylistVideo[];
}
