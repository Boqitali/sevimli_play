import { IsNotEmpty, IsString, IsUrl, IsInt, Min } from "class-validator";

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsUrl()
  thumbnail_url: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  views: number;

  @IsNotEmpty()
  @IsString()
  country_movie: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
