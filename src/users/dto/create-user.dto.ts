import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Vali Valiyev",
    description: "Userning ism familiyasi",
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: "userjon@gmail.com",
    description: "userningning ism familiyasi",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "+998916066606",
    description: "Userning telefon raqami",
  })
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: "strongpassword123",
    description: "Userning paroli",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "strongpassword123",
    description: "Userningning paroli",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: "profile.jpg",
    description: "Userning rasmi",
  })
  @IsOptional()
  @IsString()
  profile_image: string;
}
