import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsDateString, IsNumber } from "class-validator";
import { PremiumPlan } from "../../premium_plans/entities/premium_plan.entity";
import { User } from "../../users/entities/user.entity";

export class CreatePremiumSubscriptionDto {
  @ApiProperty({
    example: "2025-06-01T00:00:00.000Z",
    description: "Obuna boshlanish sanasi",
  })
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    example: "2025-07-01T00:00:00.000Z",
    description: "Obuna tugash sanasi",
  })
  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @ApiProperty({ example: 30, description: "Obuna davomiyligi (kunlarda)" })
  @IsNotEmpty()
  @IsNumber()
  duration_days: number;

  @ApiProperty({
    type: () => PremiumPlan,
    description: "Ushbu obunaga tegishli bo'lgan Premium Plan",
  })
  @IsNotEmpty()
  @IsNumber()
  premiumPlanId: number;

  @ApiProperty({
    type: () => User,
    description: "Ushbu obuna bilan bog'liq foydalanuvchi",
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
