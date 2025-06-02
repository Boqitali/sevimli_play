import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Video } from "../../video/entities/video.entity";
import { Tag } from "../../tags/entities/tag.entity";


@Entity()
export class VideoTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Video, (video) => video.videoTag, { onDelete: "CASCADE" })
  @JoinColumn({ name: "videoId" })
  video: Video;

  @ManyToOne(() => Tag, (tag) => tag.videoTag, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tagId" })
  tag: Tag;
}
