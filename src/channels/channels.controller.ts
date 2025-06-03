import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ChannelsService } from "./channels.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Channel } from "./entities/channel.entity";

@Controller("channels")
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @ApiOperation({ summary: "Yangi kanal yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kanal muvaffaqiyatli yaratildi",
    type: Channel,
  })
  @Post()
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(createChannelDto);
  }

  @ApiOperation({ summary: "Barcha kanallar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Kanallar muvaffaqiyatli olindi",
    type: [Channel],
  })
  @Get()
  findAll() {
    return this.channelsService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha kanalni olish" })
  @ApiResponse({
    status: 200,
    description: "Kanal topildi",
    type: Channel,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.channelsService.findOne(+id);
  }

  @ApiOperation({ summary: "Kanal ma'lumotlarini tahrirlash" })
  @ApiResponse({
    status: 200,
    description: "Kanal muvaffaqiyatli yangilandi",
    type: Channel,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelsService.update(+id, updateChannelDto);
  }

  @ApiOperation({ summary: "Kanalni o'chirish" })
  @ApiResponse({ 
    status: 200, 
    description: "Kanal o'chirildi", 
    type: Channel 
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.channelsService.remove(+id);
  }
}
