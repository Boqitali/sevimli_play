import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
} from "class-validator";

export class CreatePremiumPlanDto {
  @ApiProperty({
    example: "Gold Plan",
    description: "Premium reja nomi",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 9.99, description: "Narxi ($)" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 30, description: "Davomiyligi (kunlarda)" })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  duration_days: number;

  @ApiProperty({
    example:
      "Ushbu reja 4K videolar va reklamasiz foydalanish imkonini beradi.",
    description: "Rejaning tavsifi",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;
}
