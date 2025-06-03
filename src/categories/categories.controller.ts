import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Category } from "./entities/category.entity";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Yangi kategoriya yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kategoriya yaratildi",
    type: Category,
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: "Barcha kategoriyalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriyalar ro'yxati",
    type: [Category],
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: "Kategoriya ID orqali topish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan kategoriya",
    type: Category,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }

  @ApiOperation({ summary: "Kategoriya ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya yangilandi",
    type: Category,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Kategoriya ochirish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya ochirildi",
    type: Category,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}
