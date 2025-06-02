import { IsNotEmpty, IsString, IsBoolean, IsInt } from "class-validator";

export class CreateNotificationDto {
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
