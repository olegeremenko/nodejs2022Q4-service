import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Album} from "../../albums/entities/album.entity";
import {Track} from "../../tracks/entities/track.entity";

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[]

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[]
}
