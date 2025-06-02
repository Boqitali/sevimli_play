import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePremiumPlanDto } from "./dto/create-premium_plan.dto";
import { UpdatePremiumPlanDto } from "./dto/update-premium_plan.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PremiumPlan } from "./entities/premium_plan.entity";
import { Repository } from "typeorm";

@Injectable()
export class PremiumPlansService {
  constructor(
    @InjectRepository(PremiumPlan)
    private readonly premiumPlanRepo: Repository<PremiumPlan>
  ) {}
  create(createPremiumPlanDto: CreatePremiumPlanDto) {
    return this.premiumPlanRepo.save(createPremiumPlanDto);
  }

  findAll() {
    return this.premiumPlanRepo.find();
  }

  findOne(id: number) {
    return this.premiumPlanRepo.findOneBy({ id });
  }

  async update(id: number, updatePremiumPlanDto: UpdatePremiumPlanDto) {
    const premiumPlan = await this.premiumPlanRepo.findOne({ where: { id } });

    if (!premiumPlan) {
      throw new NotFoundException(`premiumPlan with ID ${id} not found`);
    }

    Object.assign(premiumPlan, updatePremiumPlanDto);
    return this.premiumPlanRepo.save(premiumPlan);
  }

  remove(id: number) {
    return this.premiumPlanRepo.preload({ id });
  }
}
