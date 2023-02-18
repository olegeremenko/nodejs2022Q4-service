import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @JoinTable()
  @ManyToMany(() => Artist, { onDelete: 'CASCADE', eager: true })
  artists: Artist[];

  @JoinTable()
  @ManyToMany(() => Album, { onDelete: 'CASCADE', eager: true })
  albums: Album[];

  @JoinTable()
  @ManyToMany(() => Track, { onDelete: 'CASCADE', eager: true })
  tracks: Track[];
}

export enum EntityTitles {
  TRACK = 'Track',
  ALBUM = 'Album',
  ARTIST = 'Artist',
  USER = 'User',
}

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
