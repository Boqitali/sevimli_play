import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Video } from "../../video/entities/video.entity";
import { Tag } from "../../tags/entities/tag.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class VideoTag {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Video, description: "Tegishli video" })
  @ManyToOne(() => Video, (video) => video.videoTag, { onDelete: "CASCADE" })
  @JoinColumn({ name: "videoId" })
  video: Video;

  @ApiProperty({ type: () => Tag, description: "Tegishli tag" })
  @ManyToOne(() => Tag, (tag) => tag.videoTag, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tagId" })
  tag: Tag;
}
