import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PremiumSubscriptionsService } from './premium_subscriptions.service';
import { CreatePremiumSubscriptionDto } from './dto/create-premium_subscription.dto';
import { UpdatePremiumSubscriptionDto } from './dto/update-premium_subscription.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PremiumSubscription } from './entities/premium_subscription.entity';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller("premium-subscriptions")
@UseGuards(AuthGuard)
export class PremiumSubscriptionsController {
  constructor(
    private readonly premiumSubscriptionsService: PremiumSubscriptionsService
  ) {}

  @ApiOperation({ summary: "Yangi premium obuna yaratish" })
  @ApiResponse({
    status: 201,
    description: "Premium obuna muvaffaqiyatli yaratildi.",
    type: PremiumSubscription,
  })
  @Post()
  create(@Body() createPremiumSubscriptionDto: CreatePremiumSubscriptionDto) {
    return this.premiumSubscriptionsService.create(
      createPremiumSubscriptionDto
    );
  }

  @ApiOperation({ summary: "Barcha premium obunalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Premium obunalar ro'yxati",
    type: [PremiumSubscription],
  })
  @Get()
  findAll() {
    return this.premiumSubscriptionsService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha premium obunani olish" })
  @ApiResponse({
    status: 200,
    description: "Premium obuna",
    type: PremiumSubscription,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.premiumSubscriptionsService.findOne(+id);
  }

  @ApiOperation({ summary: "Premium obunani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan premium obuna",
    type: PremiumSubscription,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePremiumSubscriptionDto: UpdatePremiumSubscriptionDto
  ) {
    return this.premiumSubscriptionsService.update(
      +id,
      updatePremiumSubscriptionDto
    );
  }

  @ApiOperation({ summary: "Premium obunani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Premium obuna muvaffaqiyatli o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.premiumSubscriptionsService.remove(+id);
  }
}
