import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl, IsInt, Min } from "class-validator";

export class CreateVideoDto {
  @ApiProperty({
    example: "Shaytanat",
    description: "Kino nomi",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: "Bu kino jinoyatchilik dunyosidagi voqealarni yoritadi.",
    description: "Kino haqida qisqacha ma'lumot",
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: "https://example.com/videos/shaytanat.mp4",
    description: "Videoning URL manzili",
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({
    example: "https://example.com/thumbnails/shaytanat.jpg",
    description: "Videoga tegishli thumbnail rasmi URL manzili",
  })
  @IsNotEmpty()
  @IsUrl()
  thumbnail_url: string;

  @ApiProperty({
    example: 1500,
    description: "Videoni ko'rganlar soni",
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  views: number;

  @ApiProperty({
    example: "O'zbekiston",
    description: "Film qaysi davlatda suratga olingan",
  })
  @IsNotEmpty()
  @IsString()
  country_movie: string;

  @ApiProperty({
    example: 1,
    description: "Videoni yuklagan foydalanuvchining ID raqami",
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 2,
    description: "Video tegishli bo'lgan kategoriya ID raqami",
  })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
