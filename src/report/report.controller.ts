import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReportService } from "./report.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Report } from "./entities/report.entity";

@Controller("report")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({ summary: "Yangi report yaratish" })
  @ApiResponse({
    status: 201,
    description: "Report muvaffaqiyatli yaratildi",
    type: Report,
  })
  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @ApiOperation({ summary: "Barcha reportlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha reportlar ro'yxati",
    type: [Report],
  })
  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @ApiOperation({ summary: "ID orqali reportni olish" })
  @ApiResponse({ 
    status: 200, 
    description: "Topilgan report", 
    type: Report 
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reportService.findOne(+id);
  }

  @ApiOperation({ summary: "Reportni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Report muvaffaqiyatli yangilandi",
    type: Report,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @ApiOperation({ summary: "Reportni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Report muvaffaqiyatli o'chirildi",
    type: Report,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reportService.remove(+id);
  }
}
