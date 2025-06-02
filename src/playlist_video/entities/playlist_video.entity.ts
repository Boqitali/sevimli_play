import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Playlist } from "../../playlists/entities/playlist.entity";
import { Video } from "../../video/entities/video.entity";


@Entity()
export class PlaylistVideo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlistVideo, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "playListId" })
  playlist: Playlist;

  @ManyToOne(() => Video, (video) => video.playlistVideo, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "videoId" })
  video: Video;
}
