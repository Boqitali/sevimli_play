import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { User } from '../users/entities/user.entity';
import { Channel } from '../channels/entities/channel.entity';
import { UsersService } from '../users/users.service';
import { ChannelsService } from '../channels/channels.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User, Channel]), MailModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, UsersService, ChannelsService],
})
export class SubscriptionsModule {}
