import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, ...otherDto } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Paroller mos emas!");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newAdmin = await this.adminRepo.save({
      ...otherDto,
      password: hashed_password,
    });
    return newAdmin;
  }

  findAll() {
    return this.adminRepo.find();
  }

  findByEmail(email: string) {
    return this.adminRepo.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.adminRepo.findOneBy({ id });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    Object.assign(admin, updateAdminDto);
    return this.adminRepo.save(admin);
  }

  remove(id: number) {
    return this.adminRepo.delete({ id });
  }

  async save(admin: Admin) {
    return this.adminRepo.save(admin);
  }
}
