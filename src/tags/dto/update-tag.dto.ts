import { PartialType } from "@nestjs/mapped-types";
import { CreateTagDto } from "./create-tag.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsString()
  @IsNotEmpty()
  name: string;
}
