import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Playlist } from "../../playlists/entities/playlist.entity";
import { Video } from "../../video/entities/video.entity";
import { Channel } from "../../channels/entities/channel.entity";
import { Notification } from "../../notifications/entities/notification.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_image: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: "user" })
  role: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: "" })
  refresh_token: string;

  @Column()
  activation_link: string;

  // @OneToMany(() => Comment, (comment) => comment.user)
  // comments: Comment[];

  // @OneToMany(() => Like, (like) => like.user)
  // like: Like[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlist: Playlist[];

  @OneToMany(() => Video, (video) => video.user)
  video: Video[];

  @OneToMany(() => Channel, (channel) => channel.user)
  channel: User[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notification: Notification[]
}
