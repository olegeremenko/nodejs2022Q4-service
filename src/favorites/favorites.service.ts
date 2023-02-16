import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { EntityTitles, Favorite, Favorites } from './entities/favorite.entity';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import {Artist} from "../artists/entities/artist.entity";
import {Album} from "../albums/entities/album.entity";
import {Track} from "../tracks/entities/track.entity";

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepository: FavoritesRepository,
  ) {}

  async findAll(): Promise<Favorites> {
    const favorites: Favorite = await this.favoritesRepository.findAll();

    return {
      artists: [],
      albums: [],
      tracks: []
    };
    // return {
    //   albums: await this.albumsRepository.findMany({
    //     key: 'id',
    //     equalsAnyOf: favorites.albums,
    //   }),
    //   artists: await this.artistsRepository.findMany({
    //     key: 'id',
    //     equalsAnyOf: favorites.artists,
    //   }),
    //   tracks: await this.tracksRepository.findMany({
    //     key: 'id',
    //     equalsAnyOf: favorites.tracks,
    //   }),
    // };
  }

  async addTrack(id: string): Promise<void> {
    const track = null;
    //   await this.tracksRepository.findOne({
    //   key: 'id',
    //   equals: id,
    // });

    // if (!track) {
    //   throw new EntityNotFoundException(EntityTitles.TRACK, id);
    // }

    await this.favoritesRepository.addTrack(id);
  }

  async removeTrack(id: string): Promise<void> {
    await this.favoritesRepository.removeTrack(id);
  }

  async addAlbum(id: string): Promise<void> {
    // if (!(await this.albumsRepository.findOne({ key: 'id', equals: id }))) {
    //   throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    // }
    await this.favoritesRepository.addAlbum(id);
  }

  async removeAlbum(id: string): Promise<void> {
    await this.favoritesRepository.removeAlbum(id);
  }

  async addArtist(id: string): Promise<void> {
    // if (!(await this.artistsRepository.findOne({ key: 'id', equals: id }))) {
    //   throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    // }
    await this.favoritesRepository.addArtist(id);
  }

  async removeArtist(id: string): Promise<void> {
    await this.favoritesRepository.removeArtist(id);
  }
}
