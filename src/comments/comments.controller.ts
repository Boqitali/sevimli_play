import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Comment } from "./entities/comment.entity";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: "Yangi comment yaratish" })
  @ApiResponse({ status: 201, description: "Comment yaratildi", type: Comment })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

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

  @ApiOperation({ summary: "ID orqali comment olish" })
  @ApiResponse({ status: 200, description: "Topilgan comment", type: Comment })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(+id);
  }

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
