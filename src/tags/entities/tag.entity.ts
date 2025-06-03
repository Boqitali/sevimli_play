import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VideoTag } from "../../video_tags/entities/video_tag.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Tag {
  @ApiProperty({
    example: 1,
    description: "Tagning uniqal ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "drama",
    description: "Tafsilotlari",
  })
  @Column()
  name: string;

  @OneToMany(() => VideoTag, (videoTag) => videoTag.tag)
  videoTag: VideoTag[];
}
