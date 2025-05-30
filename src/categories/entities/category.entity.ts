import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "../../video/entities/video.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desciption: string;

  @OneToMany(() => Video, (video) => video.category)
  video: Video[];
}
