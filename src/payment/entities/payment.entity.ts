import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { PremiumSubscription } from "../../premium_subscriptions/entities/premium_subscription.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Payment {
  @ApiProperty({ example: 1, description: "To'lov ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 49.99, description: "To'lov summasi (USD)" })
  @Column()
  amount: number;

  @ApiProperty({ example: "Click", description: "To'lov provayderi nomi" })
  @Column()
  payment_provider: string;

  @ApiProperty({
    example: "completed",
    description: "To'lov holati (completed, pending, failed)",
  })
  @Column()
  status: string;

  @ApiProperty({ type: () => User, description: "To'lov qilgan foydalanuvchi" })
  @ManyToOne(() => User, (user) => user.payment)
  @JoinColumn({ name: "userId" })
  user: User;

  @ApiProperty({
    type: () => PremiumSubscription,
    description: "Tegishli premium obuna",
  })
  @ManyToOne(
    () => PremiumSubscription,
    (premiumSubscription) => premiumSubscription.payment
  )
  @JoinColumn({ name: "premiumSubscriptionId" })
  premiumSubscription: PremiumSubscription;
}
