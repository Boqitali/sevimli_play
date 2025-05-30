import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password, ...otherDto } = createUserDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Paroller mos emas!");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userRepo.save({
      ...otherDto,
      password: hashed_password,
    });
    return newUser;
  }

  findAll() {
    return this.userRepo.find();
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, confirm_password, ...otherDto } = updateUserDto;
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (password) {
      user.password = await bcrypt.hash(password, 7);
    }
    Object.assign(user, otherDto);
    return await this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete({ id });
  }

  async save(user: User) {
    return this.userRepo.save(user);
  }
}
