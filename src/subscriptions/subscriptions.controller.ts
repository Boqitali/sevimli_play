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
import { SubscriptionsService } from "./subscriptions.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Subscription } from "./entities/subscription.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rols.auth-decorator";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Yangi obuna yaratish" })
  @ApiResponse({
    status: 201,
    description: "Obuna muvaffaqiyatli yaratildi.",
    type: Subscription,
  })
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Barcha obunalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha obunalar ro‘yxati.",
    type: [Subscription],
  })
  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "ID orqali bitta obunani olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan obuna.",
    type: Subscription,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subscriptionsService.findOne(+id);
  }

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Obunani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Obuna muvaffaqiyatli yangilandi.",
    type: Subscription,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto
  ) {
    return this.subscriptionsService.update(+id, updateSubscriptionDto);
  }

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Obunani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Obuna muvaffaqiyatli o'chirildi.",
    type: Subscription,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subscriptionsService.remove(+id);
  }
}
