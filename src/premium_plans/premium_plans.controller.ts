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
import { PremiumPlansService } from "./premium_plans.service";
import { CreatePremiumPlanDto } from "./dto/create-premium_plan.dto";
import { UpdatePremiumPlanDto } from "./dto/update-premium_plan.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PremiumPlan } from "./entities/premium_plan.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@Controller("premium-plans")
export class PremiumPlansController {
  constructor(private readonly premiumPlansService: PremiumPlansService) {}

  @UseGuards(AuthGuard, AdminGuard)
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

  @UseGuards(AuthGuard, AdminGuard)
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

  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "ID bo'yicha premium rejani olish" })
  @ApiResponse({ status: 200, description: "Topilgan reja", type: PremiumPlan })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.premiumPlansService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
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

  @UseGuards(AuthGuard, AdminGuard)
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
