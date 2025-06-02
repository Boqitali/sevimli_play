import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber("UZ")
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @IsOptional()
  @IsString()
  profile_image: string;
}
