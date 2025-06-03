import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Admin } from "./entities/admin.entity";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Adminlarni qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Create admin",
    type: Admin,
  })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({
    status: 200,
    description: "List of admin",
    type: [Admin],
  })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "Adminni id bilan olish" })
  @ApiResponse({
    status: 200,
    description: "Adminni id orqali ko'rish",
    type: Admin,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: "Adminni id bilan yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update admin",
    type: Admin,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni id bilan o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete admin",
    type: Admin,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
