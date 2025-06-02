import { PartialType } from "@nestjs/mapped-types";
import { CreateSubscriptionDto } from "./create-subscription.dto";
import { IsNotEmpty, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  subscribed_at: Date;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  channelId: number;
}
