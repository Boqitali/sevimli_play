import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { PremiumPlan } from "../../premium_plans/entities/premium_plan.entity";
import { Payment } from "../../payment/entities/payment.entity";

@Entity()
export class PremiumSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  duration_days: number;

  @Column({ default: false })
  is_active: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @ManyToOne(
    () => PremiumPlan,
    (premiumPlan) => premiumPlan.premiumSubscriptions
  )
  @JoinColumn({ name: "premiumPlanId" })
  premiumPlan: PremiumPlan;

  @ManyToOne(() => User, (user) => user.premiumSubscriptions)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Payment, (payment) => payment.premiumSubscription)
  payment: Payment[];
}
