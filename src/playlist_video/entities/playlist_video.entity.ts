import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Playlist } from "../../playlists/entities/playlist.entity";
import { Video } from "../../video/entities/video.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class PlaylistVideo {
  @ApiProperty({ example: 1, description: "Unikal PlaylistVideo ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Playlist, description: "Bog'langan Playlist" })
  @ManyToOne(() => Playlist, (playlist) => playlist.playlistVideo, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "playListId" })
  playlist: Playlist;

  @ApiProperty({ type: () => Video, description: "Bog'langan Video" })
  @ManyToOne(() => Video, (video) => video.playlistVideo, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "videoId" })
  video: Video;
}
