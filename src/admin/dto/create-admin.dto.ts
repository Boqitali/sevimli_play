import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: "admin123",
    description: "Adminning foydalanuvchi nomi (username)",
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: "admin@gmail.com",
    description: "Adminning email manzili",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Adminning telefon raqami",
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: "hashedPassword123",
    description: "Adminning paroli (hashlangan bo'lishi kerak)",
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "hashedPassword123",
    description: "Adminning paroli (hashlangan bo'lishi kerak)",
  })
  @IsNotEmpty()
  @MinLength(6)
  confirm_password: string;
}
