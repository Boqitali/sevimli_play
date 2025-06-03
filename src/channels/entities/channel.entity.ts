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
import { Subscription } from "../../subscriptions/entities/subscription.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Channel {
  @ApiProperty({
    example: 1,
    description: "Kanalning noyob ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Sevimli Dasturchi",
    description: "Kanal nomi",
  })
  @Column()
  name: string;

  @ApiProperty({
    example: "Dasturlashga oid eng so'nggi videolar",
    description: "Kanal tavsifi",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: "2024-06-03T12:00:00.000Z",
    description: "Kanalga obuna bo'lingan vaqt",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  subscribed_at: Date;

  @ApiProperty({
    example: "2024-06-01T10:30:00.000Z",
    description: "Kanal yaratilgan vaqti",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: 1,
    description: "Kanal egasi bo'lgan foydalanuvchi",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.channel)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Subscription, (subscription) => subscription.channel)
  subscription: Subscription[];
}
