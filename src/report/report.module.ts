import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';
import { UsersService } from '../users/users.service';
import { VideoService } from '../video/video.service';
import { Category } from '../categories/entities/category.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report, User, Video, Category]), MailModule],
  controllers: [ReportController],
  providers: [ReportService, UsersService, VideoService],
})
export class ReportModule {}
