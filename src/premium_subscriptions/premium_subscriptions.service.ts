import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePremiumSubscriptionDto } from "./dto/create-premium_subscription.dto";
import { UpdatePremiumSubscriptionDto } from "./dto/update-premium_subscription.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { PremiumSubscription } from "./entities/premium_subscription.entity";
import { PremiumPlan } from "../premium_plans/entities/premium_plan.entity";

@Injectable()
export class PremiumSubscriptionsService {
  constructor(
    @InjectRepository(PremiumSubscription)
    private readonly premiumSubscriptionRepo: Repository<PremiumSubscription>,
    @InjectRepository(PremiumPlan)
    private readonly premiumPlanRepo: Repository<PremiumPlan>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}
  async create(createPremiumSubscriptionDto: CreatePremiumSubscriptionDto) {
    const user = await this.userRepo.findOne({
      where: { id: createPremiumSubscriptionDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createPremiumSubscriptionDto.userId} not found`
      );
    }

    const premiumPlan = await this.premiumPlanRepo.findOne({
      where: { id: createPremiumSubscriptionDto.premiumPlanId },
    });
    if (!premiumPlan) {
      throw new NotFoundException(
        `premiumPlan with id ${createPremiumSubscriptionDto.premiumPlanId} not found`
      );
    }
    return this.premiumSubscriptionRepo.save({
      ...createPremiumSubscriptionDto,
      user,
      premiumPlan,
    });
  }

  findAll() {
    return this.premiumSubscriptionRepo.find({
      relations: ["user", "premiumPlan"],
    });
  }

  findOne(id: number) {
    return this.premiumSubscriptionRepo.findOne({
      where: { id },
      relations: ["user", "premiumPlan"],
    });
  }

  update(
    id: number,
    updatePremiumSubscriptionDto: UpdatePremiumSubscriptionDto
  ) {
    return this.premiumSubscriptionRepo.preload({
      id,
      ...updatePremiumSubscriptionDto,
    });
  }

  remove(id: number) {
    return this.premiumSubscriptionRepo.delete({ id });
  }
}
