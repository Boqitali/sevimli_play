import { IsNotEmpty, IsDate, IsInt } from "class-validator";
import { Type } from "class-transformer";

export class CreateSubscriptionDto {
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
