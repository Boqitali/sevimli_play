import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>
  ) {}
  create(createTagDto: CreateTagDto) {
    return this.tagRepo.save(createTagDto);
  }

  findAll() {
    return this.tagRepo.find();
  }

  findOne(id: number) {
    return this.tagRepo.findOneBy({ id });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagRepo.findOne({ where: { id } });

    if (!tag) {
      throw new NotFoundException(`tag with ID ${id} not found`);
    }

    Object.assign(tag, updateTagDto);
    return this.tagRepo.save(tag);
  }

  remove(id: number) {
    return this.tagRepo.delete({id})
  }
}
