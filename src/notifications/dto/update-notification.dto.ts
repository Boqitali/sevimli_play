import { PartialType } from "@nestjs/mapped-types";
import { CreateNotificationDto } from "./create-notification.dto";
import { IsNotEmpty, IsString, IsBoolean, IsInt } from "class-validator";

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsBoolean()
  is_read: boolean;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
