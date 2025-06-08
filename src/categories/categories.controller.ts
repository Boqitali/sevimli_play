import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Category } from "./entities/category.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rols.auth-decorator";

@Controller("categories")
@UseGuards(AuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Yangi kategoriya yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kategoriya yaratildi",
    type: Category,
  })
  @Roles("admin", "user")
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
  @Roles("admin", "user")
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
  @Roles("admin", "user")
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
  @Roles("admin")
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
  @Roles("admin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}
