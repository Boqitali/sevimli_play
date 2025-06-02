import { Module } from '@nestjs/common';
import { PremiumSubscriptionsService } from './premium_subscriptions.service';
import { PremiumSubscriptionsController } from './premium_subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremiumSubscription } from './entities/premium_subscription.entity';
import { User } from '../users/entities/user.entity';
import { PremiumPlan } from '../premium_plans/entities/premium_plan.entity';
import { UsersService } from '../users/users.service';
import { PremiumPlansService } from '../premium_plans/premium_plans.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([PremiumSubscription, User, PremiumPlan]), MailModule],
  controllers: [PremiumSubscriptionsController],
  providers: [PremiumSubscriptionsService, UsersService, PremiumPlansService],
  exports: [PremiumSubscriptionsService],
})
export class PremiumSubscriptionsModule {}
