import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Channel } from "../../channels/entities/channel.entity";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  subscribed_at: Date;

  @ManyToOne(() => User, (user) => user.subscription)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.subscription)
  @JoinColumn({ name: "channelId" })
  channel: Channel;
}
