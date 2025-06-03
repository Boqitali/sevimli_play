import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PremiumPlansService } from "./premium_plans.service";
import { CreatePremiumPlanDto } from "./dto/create-premium_plan.dto";
import { UpdatePremiumPlanDto } from "./dto/update-premium_plan.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PremiumPlan } from "./entities/premium_plan.entity";

@Controller("premium-plans")
export class PremiumPlansController {
  constructor(private readonly premiumPlansService: PremiumPlansService) {}

  @ApiOperation({ summary: "Yangi premium reja yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yaratilgan reja",
    type: PremiumPlan,
  })
  @Post()
  create(@Body() createPremiumPlanDto: CreatePremiumPlanDto) {
    return this.premiumPlansService.create(createPremiumPlanDto);
  }

  @ApiOperation({ summary: "Barcha premium rejalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Rejalar ro'yxati",
    type: [PremiumPlan],
  })
  @Get()
  findAll() {
    return this.premiumPlansService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha premium rejani olish" })
  @ApiResponse({ status: 200, description: "Topilgan reja", type: PremiumPlan })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.premiumPlansService.findOne(+id);
  }

  @ApiOperation({ summary: "Premium rejani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan reja",
    type: PremiumPlan,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePremiumPlanDto: UpdatePremiumPlanDto
  ) {
    return this.premiumPlansService.update(+id, updatePremiumPlanDto);
  }

  @ApiOperation({ summary: "Premium rejani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Reja muvaffaqiyatli o'chirildi",
    type: PremiumPlan,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.premiumPlansService.remove(+id);
  }
}
