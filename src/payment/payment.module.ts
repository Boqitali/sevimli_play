import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { PremiumSubscription } from '../premium_subscriptions/entities/premium_subscription.entity';
import { UsersService } from '../users/users.service';
import { PremiumSubscriptionsService } from '../premium_subscriptions/premium_subscriptions.service';
import { PremiumPlan } from '../premium_plans/entities/premium_plan.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      User,
      PremiumSubscription,
      PremiumPlan,
    ]),
    MailModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService, UsersService, PremiumSubscriptionsService],
})
export class PaymentModule {}
