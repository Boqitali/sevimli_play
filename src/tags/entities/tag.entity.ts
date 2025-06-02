import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VideoTag } from "../../video_tags/entities/video_tag.entity";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => VideoTag, (videoTag) => videoTag.tag)
  videoTag: VideoTag[];
}
