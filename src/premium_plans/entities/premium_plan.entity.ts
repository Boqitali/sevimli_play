import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PremiumSubscription } from "../../premium_subscriptions/entities/premium_subscription.entity";

@Entity()
export class PremiumPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  duration_days: number;

  @Column()
  description: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(
    () => PremiumSubscription,
    (premiumSubscriptions) => premiumSubscriptions.premiumPlan
  )
  premiumSubscriptions: PremiumSubscription[];
}
