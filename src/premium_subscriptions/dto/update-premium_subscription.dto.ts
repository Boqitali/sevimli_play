import { PartialType } from "@nestjs/mapped-types";
import { CreatePremiumSubscriptionDto } from "./create-premium_subscription.dto";
import { IsNotEmpty, IsDateString, IsNumber } from "class-validator";

export class UpdatePremiumSubscriptionDto extends PartialType(
  CreatePremiumSubscriptionDto
) {
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  duration_days: number;

  @IsNotEmpty()
  @IsNumber()
  premiumPlanId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
