import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PremiumSubscription } from "../../premium_subscriptions/entities/premium_subscription.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class PremiumPlan {
  @ApiProperty({
    example: 1,
    description: "Unikal ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Gold Plan",
    description: "Premium reja nomi",
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 999,
    description: "Narxi ($)",
  })
  @Column()
  price: number;

  @ApiProperty({
    example: 30,
    description: "Davomiyligi (kunlarda)",
  })
  @Column()
  duration_days: number;

  @ApiProperty({
    example:
      "Ushbu reja 4K videolar va reklamasiz foydalanish imkonini beradi.",
    description: "Rejaning tavsifi",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: "2025-06-03T12:00:00.000Z",
    description: "Yaratilgan vaqti",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(
    () => PremiumSubscription,
    (premiumSubscriptions) => premiumSubscriptions.premiumPlan
  )
  premiumSubscriptions: PremiumSubscription[];
}
