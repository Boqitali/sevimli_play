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
import { ReportService } from "./report.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Report } from "./entities/report.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { UserGuard } from "../common/guards/user.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rols.auth-decorator";

@Controller("report")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(AuthGuard, UserGuard)
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

  @UseGuards(AuthGuard, AdminGuard)
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

  @UseGuards(AuthGuard, AdminGuard)
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

  @UseGuards(AuthGuard, UserGuard)
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

  @Roles("Admin", "user")
  @UseGuards(AuthGuard, RolesGuard)
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
