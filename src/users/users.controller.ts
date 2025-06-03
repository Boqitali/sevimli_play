import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "./entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Userlarni qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Create user",
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Barcha userlarni olish" })
  @ApiResponse({
    status: 200,
    description: "List of user",
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Userni id bilan olish" })
  @ApiResponse({
    status: 200,
    description: "Userni id orqali ko'rish",
    type: User,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Userni id bilan yangilash" })
  @ApiResponse({
    status: 200,
    description: "Update user",
    type: User,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Userni id bilan o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Delete user",
    type: User,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: "Userni activet qilish" })
  @ApiResponse({
    status: 200,
    description: "Delete user",
    type: User,
  })
  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }
}
