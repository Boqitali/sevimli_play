import { PartialType } from "@nestjs/mapped-types";
import { CreatePremiumPlanDto } from "./create-premium_plan.dto";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
} from "class-validator";

export class UpdatePremiumPlanDto extends PartialType(CreatePremiumPlanDto) {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  duration_days: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;
}
