import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "../../video/entities/video.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Category {
  @ApiProperty({
    example: 1,
    description: "Kategoriya ID raqami (avtomatik yaratiladi)",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Komediya",
    description: "Kategoriya nomi",
  })
  @Column()
  name: string;

  @ApiProperty({
    example: "Kuldiradigan videolar toifasi",
    description: "Kategoriya tavsifi",
  })
  @Column()
  desciption: string;

  @OneToMany(() => Video, (video) => video.category)
  video: Video[];
}
