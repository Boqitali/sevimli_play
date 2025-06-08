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
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Notification } from "./entities/notification.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rols.auth-decorator";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Yangi bildirishnoma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Bildirishnoma yaratildi",
    type: Notification,
  })
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha bildirishnomalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli",
    type: [Notification],
  })
  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "ID orqali bitta bildirishnomani olish" })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli topildi",
    type: Notification,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Bildirishnomani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli yangilandi",
    type: Notification,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Bildirishnomani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli o'chirildi",
    type: Notification,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }
}
