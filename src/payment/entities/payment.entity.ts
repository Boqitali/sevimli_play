import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { PremiumSubscription } from "../../premium_subscriptions/entities/premium_subscription.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  payment_provider: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.payment)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(
    () => PremiumSubscription,
    (premiumSubscription) => premiumSubscription.payment
  )
  @JoinColumn({ name: "premiumSubscriptionId" })
  premiumSubscription: PremiumSubscription;
}
