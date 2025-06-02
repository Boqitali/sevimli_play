import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./entities/payment.entity";
import { User } from "../users/entities/user.entity";
import { PremiumSubscription } from "../premium_subscriptions/entities/premium_subscription.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(PremiumSubscription)
    private readonly premiumSubscriptionRepo: Repository<PremiumSubscription>
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const user = await this.userRepo.findOne({
      where: { id: createPaymentDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createPaymentDto.userId} not found`
      );
    }

    const premiumSubscription = await this.premiumSubscriptionRepo.findOne({
      where: { id: createPaymentDto.premiumSubscriptionId },
    });
    if (!premiumSubscription) {
      throw new NotFoundException(
        `premiumSubscription with id ${createPaymentDto.premiumSubscriptionId} not found`
      );
    }
    return this.paymentRepo.save({
      ...createPaymentDto,
      user,
      premiumSubscription,
    });
  }

  findAll() {
    return this.paymentRepo.find({
      relations: ["user", "premiumSubscription"],
    });
  }

  findOne(id: number) {
    return this.paymentRepo.findOne({
      where: { id },
      relations: ["user", "premiumSubscription"],
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepo.findOne({ where: { id } });

    if (!payment) {
      throw new NotFoundException(`payment with ID ${id} not found`);
    }

    Object.assign(payment, updatePaymentDto);
    return this.paymentRepo.save(payment);
  }

  remove(id: number) {
    return this.paymentRepo.delete({ id });
  }
}
