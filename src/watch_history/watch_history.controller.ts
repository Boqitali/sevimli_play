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
import { WatchHistoryService } from "./watch_history.service";
import { CreateWatchHistoryDto } from "./dto/create-watch_history.dto";
import { UpdateWatchHistoryDto } from "./dto/update-watch_history.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { WatchHistory } from "./entities/watch_history.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { UserSelfGuard } from "../common/guards/user.self.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rols.auth-decorator";

@Controller("watch-history")
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Tomosha tarixiga yangi yozuv qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yaratildi",
    type: WatchHistory,
  })
  @Post()
  create(@Body() createWatchHistoryDto: CreateWatchHistoryDto) {
    return this.watchHistoryService.create(createWatchHistoryDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "Barcha tomosha tarixlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Ro'yxat",
    type: [WatchHistory],
  })
  @Get()
  findAll() {
    return this.watchHistoryService.findAll();
  }

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "ID orqali bitta tomosha tarixini olish" })
  @ApiResponse({
    status: 200,
    description: "Topildi",
    type: WatchHistory,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.watchHistoryService.findOne(+id);
  }

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Tomosha tarixini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilandi",
    type: WatchHistory,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWatchHistoryDto: UpdateWatchHistoryDto
  ) {
    return this.watchHistoryService.update(+id, updateWatchHistoryDto);
  }

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Tomosha tarixini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirildi",
    type: WatchHistory,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.watchHistoryService.remove(+id);
  }
}
