import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsInt } from "class-validator";

export class CreateNotificationDto {
  @ApiProperty({
    example: "Sizning videosingizga like bosildi",
    description: "Bildirishnoma matni",
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    example: false,
    description: "Bildirishnoma o'qilganmi yoki yo'qmi (true yoki false)",
  })
  @IsNotEmpty()
  @IsBoolean()
  is_read: boolean;

  @ApiProperty({
    example: 2,
    description: "Bildirishnomani olgan foydalanuvchi ID raqami",
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
