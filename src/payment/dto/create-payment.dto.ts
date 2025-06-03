import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { PremiumSubscription } from "../../premium_subscriptions/entities/premium_subscription.entity";

export class CreatePaymentDto {
  @ApiProperty({ example: 49.99, description: "To'lov summasi (USD)" })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "Click", description: "To'lov provayderi nomi" })
  @IsNotEmpty()
  @IsString()
  payment_provider: string;

  @ApiProperty({
    example: "completed",
    description: "To'lov holati (completed, pending, failed)",
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ type: () => User, description: "To'lov qilgan foydalanuvchi" })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    type: () => PremiumSubscription,
    description: "Tegishli premium obuna",
  })
  @IsNotEmpty()
  @IsNumber()
  premiumSubscriptionId: number;
}
