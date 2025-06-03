import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Tag } from "./entities/tag.entity";

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: "Taglarni qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Create tag",
    type: Tag,
  })
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({ summary: "Barcha taglarni olish" })
  @ApiResponse({
    status: 200,
    description: "List of tag",
    type: [Tag],
  })
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @ApiOperation({ summary: "Tagni id bilan olish" })
  @ApiResponse({
    status: 200,
    description: "Tagni id orqali ko'rish",
    type: Tag,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tagsService.findOne(+id);
  }

  @ApiOperation({ summary: "Tagni id bilan yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update tag",
    type: Tag,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @ApiOperation({ summary: "Tagni id bilan o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete tag",
    type: Tag,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tagsService.remove(+id);
  }
}
