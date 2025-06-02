import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PremiumSubscriptionsService } from './premium_subscriptions.service';
import { CreatePremiumSubscriptionDto } from './dto/create-premium_subscription.dto';
import { UpdatePremiumSubscriptionDto } from './dto/update-premium_subscription.dto';

@Controller('premium-subscriptions')
export class PremiumSubscriptionsController {
  constructor(private readonly premiumSubscriptionsService: PremiumSubscriptionsService) {}

  @Post()
  create(@Body() createPremiumSubscriptionDto: CreatePremiumSubscriptionDto) {
    return this.premiumSubscriptionsService.create(createPremiumSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.premiumSubscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.premiumSubscriptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePremiumSubscriptionDto: UpdatePremiumSubscriptionDto) {
    return this.premiumSubscriptionsService.update(+id, updatePremiumSubscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.premiumSubscriptionsService.remove(+id);
  }
}
