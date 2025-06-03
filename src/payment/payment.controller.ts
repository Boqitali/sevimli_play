import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Payment } from "./entities/payment.entity";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: "Yangi to'lov yaratish" })
  @ApiResponse({ status: 201, description: "To'lov yaratildi", type: Payment })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

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

  @ApiOperation({ summary: "ID bo'yicha to'lovni olish" })
  @ApiResponse({ status: 200, description: "Bitta to'lov", type: Payment })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

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
