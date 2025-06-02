import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PremiumPlansService } from './premium_plans.service';
import { CreatePremiumPlanDto } from './dto/create-premium_plan.dto';
import { UpdatePremiumPlanDto } from './dto/update-premium_plan.dto';

@Controller('premium-plans')
export class PremiumPlansController {
  constructor(private readonly premiumPlansService: PremiumPlansService) {}

  @Post()
  create(@Body() createPremiumPlanDto: CreatePremiumPlanDto) {
    return this.premiumPlansService.create(createPremiumPlanDto);
  }

  @Get()
  findAll() {
    return this.premiumPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.premiumPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePremiumPlanDto: UpdatePremiumPlanDto) {
    return this.premiumPlansService.update(+id, updatePremiumPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.premiumPlansService.remove(+id);
  }
}
