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
import { ChannelsService } from "./channels.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Channel } from "./entities/channel.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rols.auth-decorator";

@Controller("channels")
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
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

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Kanalni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kanal o'chirildi",
    type: Channel,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.channelsService.remove(+id);
  }
}
