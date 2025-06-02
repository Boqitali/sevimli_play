import { PartialType } from "@nestjs/mapped-types";
import { CreatePaymentDto } from "./create-payment.dto";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  payment_provider: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  premiumSubscriptionId: number;
}
