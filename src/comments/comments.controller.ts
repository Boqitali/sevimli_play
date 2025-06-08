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
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Comment } from "./entities/comment.entity";
import { Roles } from "../common/decorators/rols.auth-decorator";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { UserGuard } from "../common/guards/user.guard";
import { UserSelfGuard } from "../common/guards/user.self.guard";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Roles("user")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Yangi comment yaratish" })
  @ApiResponse({ status: 201, description: "Comment yaratildi", type: Comment })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Roles("user", "admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Barcha commentlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Commentlar ro'yxati",
    type: [Comment],
  })
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Roles("user", "admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "ID orqali comment olish" })
  @ApiResponse({ status: 200, description: "Topilgan comment", type: Comment })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(+id);
  }

  @UseGuards(UserGuard, UserSelfGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Commentni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Comment muvaffaqiyatli yangilandi",
    type: Comment,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Roles("user", "admin")
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Commentni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Comment muvaffaqiyatli o'chirildi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentsService.remove(+id);
  }
}
