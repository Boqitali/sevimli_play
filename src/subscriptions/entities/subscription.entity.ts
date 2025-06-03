import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Channel } from "../../channels/entities/channel.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Subscription {
  @ApiProperty({
    example: 1,
    description: "Obuna ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "2025-06-03T10:15:30.000Z",
    description: "Foydalanuvchi obuna bo'lgan vaqti",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  subscribed_at: Date;

  @ApiProperty({
    description: "Obuna bo'lgan foydalanuvchi",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.subscription)
  @JoinColumn({ name: "userId" })
  user: User;

  @ApiProperty({
    description: "Obuna bo'lgan kanal",
    type: () => Channel,
  })
  @ManyToOne(() => Channel, (channel) => channel.subscription)
  @JoinColumn({ name: "channelId" })
  channel: Channel;
}
