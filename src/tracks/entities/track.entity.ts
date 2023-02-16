import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Artist} from "../../artists/entities/artist.entity";
import {Album} from "../../albums/entities/album.entity";

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  album: Album;

  @Column({ nullable: false })
  duration: number; // integer number
}
