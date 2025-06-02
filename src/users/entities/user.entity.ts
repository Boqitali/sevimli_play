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
import { Subscription } from "../../subscriptions/entities/subscription.entity";
import { WatchHistory } from "../../watch_history/entities/watch_history.entity";
import { Report } from "../../report/entities/report.entity";
import { PremiumSubscription } from "../../premium_subscriptions/entities/premium_subscription.entity";
import { Payment } from "../../payment/entities/payment.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { Like } from "../../likes/entities/like.entity";
import { v4 as uuidv4 } from "uuid";
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

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: "" })
  refresh_token: string;

  @Column({ default: () => `'${uuidv4()}'` })
  activation_link: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlist: Playlist[];

  @OneToMany(() => Video, (video) => video.user)
  video: Video[];

  @OneToMany(() => Channel, (channel) => channel.user)
  channel: User[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notification: Notification[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscription: Subscription[];

  @OneToMany(() => WatchHistory, (watchHistory) => watchHistory.user)
  watchHistory: WatchHistory[];

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];

  @OneToMany(
    () => PremiumSubscription,
    (premiumSubscriptions) => premiumSubscriptions.user
  )
  premiumSubscriptions: PremiumSubscription[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payment: Payment[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  like: Like[];
}
