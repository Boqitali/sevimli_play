import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { PlaylistVideo } from "../../playlist_video/entities/playlist_video.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Playlist {
  @ApiProperty({
    example: 1,
    description: "Playlistning unik ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Yaxshi ko'rgan kinolarim",
    description: "Playlist nomi",
  })
  @Column()
  name: string;

  @ApiProperty({
    example: "2025-06-03T15:00:00.000Z",
    description: "Playlist yaratilgan vaqti",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: "Playlist egasi bo'lgan foydalanuvchi",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.playlist)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => PlaylistVideo, (playlistVideo) => playlistVideo.playlist)
  playlistVideo: PlaylistVideo[];
}
