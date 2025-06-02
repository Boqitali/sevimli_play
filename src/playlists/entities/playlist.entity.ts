import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { PlaylistVideo } from "../../playlist_video/entities/playlist_video.entity";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.playlist)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => PlaylistVideo, (playlistVideo) => playlistVideo.playlist)
  playlistVideo: PlaylistVideo[];
}
