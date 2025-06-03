import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Category } from "../../categories/entities/category.entity";
import { WatchHistory } from "../../watch_history/entities/watch_history.entity";
import { Report } from "../../report/entities/report.entity";
import { Like } from "../../likes/entities/like.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { VideoTag } from "../../video_tags/entities/video_tag.entity";
import { PlaylistVideo } from "../../playlist_video/entities/playlist_video.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Video {
  @ApiProperty({
    example: 1,
    description: "Videoning uniqal ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Shaytanat",
    description: "Kino nomi",
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "Bu kino jinoyatchilik dunyosidagi voqealarni yoritadi.",
    description: "Kino haqida qisqacha ma'lumot",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: "https://example.com/videos/shaytanat.mp4",
    description: "Videoning URL manzili",
  })
  @Column()
  url: string;

  @ApiProperty({
    example: "https://example.com/thumbnails/shaytanat.jpg",
    description: "Videoga tegishli thumbnail rasmi URL manzili",
  })
  @Column()
  thumbnail_url: string;

  @ApiProperty({
    example: 1500,
    description: "Videoni ko'rganlar soni",
  })
  @Column()
  views: number;

  @ApiProperty({
    example: "2025-06-03T14:45:00.000Z",
    description: "Video yuklangan sana (avtomatik aniqlanadi)",
    readOnly: true,
  })
  @UpdateDateColumn()
  uploaded_at: Date;

  @ApiProperty({
    example: "O'zbekiston",
    description: "Film qaysi davlatda suratga olingan",
  })
  @Column()
  country_movie: string;

  @ApiProperty({
    example: 2,
    description: "Video tegishli bo'lgan kategoriya ID raqami",
  })
  @ManyToOne(() => Category, (category) => category.video)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ApiProperty({
    example: 1,
    description: "Videoni yuklagan foydalanuvchining ID raqami",
    type: () => User,
  })
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
