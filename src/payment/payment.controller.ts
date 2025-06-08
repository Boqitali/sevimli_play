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
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Payment } from "./entities/payment.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rols.auth-decorator";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Yangi to'lov yaratish" })
  @ApiResponse({ status: 201, description: "To'lov yaratildi", type: Payment })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Roles("Admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Barcha to'lovlarni olish" })
  @ApiResponse({
    status: 200,
    description: "To'lovlar ro'yxati",
    type: [Payment],
  })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "ID bo'yicha to'lovni olish" })
  @ApiResponse({ status: 200, description: "Bitta to'lov", type: Payment })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "To'lovni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan to'lov",
    type: Payment,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Roles("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "To'lovni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirilgan to'lov",
    type: Payment,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
