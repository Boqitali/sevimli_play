import { Module } from '@nestjs/common';
import { PremiumPlansService } from './premium_plans.service';
import { PremiumPlansController } from './premium_plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremiumPlan } from './entities/premium_plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PremiumPlan])],
  controllers: [PremiumPlansController],
  providers: [PremiumPlansService],
  exports: [PremiumPlansService],
})
export class PremiumPlansModule {}
