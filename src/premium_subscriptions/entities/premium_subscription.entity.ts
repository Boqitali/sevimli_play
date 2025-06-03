import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { PremiumPlan } from "../../premium_plans/entities/premium_plan.entity";
import { Payment } from "../../payment/entities/payment.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class PremiumSubscription {
  @ApiProperty({ example: 1, description: "Premium obuna ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "2025-06-01T00:00:00.000Z",
    description: "Obuna boshlanish sanasi",
  })
  @Column()
  start_date: Date;

  @ApiProperty({
    example: "2025-07-01T00:00:00.000Z",
    description: "Obuna tugash sanasi",
  })
  @Column()
  end_date: Date;

  @ApiProperty({ example: 30, description: "Obuna davomiyligi (kunlarda)" })
  @Column()
  duration_days: number;

  @ApiProperty({ example: true, description: "Obunaning faol holati" })
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({
    example: "2025-06-01T12:00:00.000Z",
    description: "Yaratilgan vaqt",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @ApiProperty({
    type: () => PremiumPlan,
    description: "Ushbu obunaga tegishli bo'lgan Premium Plan",
  })
  @ManyToOne(
    () => PremiumPlan,
    (premiumPlan) => premiumPlan.premiumSubscriptions
  )
  @JoinColumn({ name: "premiumPlanId" })
  premiumPlan: PremiumPlan;

  @ApiProperty({
    type: () => User,
    description: "Ushbu obuna bilan bog'liq foydalanuvchi",
  })
  @ManyToOne(() => User, (user) => user.premiumSubscriptions)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Payment, (payment) => payment.premiumSubscription)
  payment: Payment[];
}
