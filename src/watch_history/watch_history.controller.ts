import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { WatchHistoryService } from "./watch_history.service";
import { CreateWatchHistoryDto } from "./dto/create-watch_history.dto";
import { UpdateWatchHistoryDto } from "./dto/update-watch_history.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { WatchHistory } from "./entities/watch_history.entity";

@Controller("watch-history")
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

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

  @ApiOperation({ summary: "Tomosha tarixini o'chirish" })
  @ApiResponse({ 
    status: 200, 
    description: "O'chirildi", 
    type: WatchHistory 
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.watchHistoryService.remove(+id);
  }
}
