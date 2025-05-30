import { PartialType } from "@nestjs/mapped-types";
import { CreateNotificationDto } from "./create-notification.dto";

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  message: string;

  is_read: boolean;

  userId: number;
}
