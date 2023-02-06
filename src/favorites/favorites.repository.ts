import { Injectable } from '@nestjs/common';
import { EntityTitles, Favorite } from './entities/favorite.entity';
import AlreadyInFavoritesException from '../exceptions/already-in-favorites.exception';
import NotInFavoritesException from '../exceptions/not-in-favorites.exception';

@Injectable()
export class FavoritesRepository {
  favorites: Favorite;

  constructor() {
    this.favorites = new Favorite();
  }

  async findAll(): Promise<Favorite> {
    return this.favorites;
  }

  async addTrack(id: string): Promise<void> {
    if (this.favorites.tracks.includes(id)) {
      throw new AlreadyInFavoritesException(EntityTitles.TRACK, id);
    }
    this.favorites.tracks.push(id);
  }

  async removeTrack(id: string): Promise<void> {
    if (!this.favorites.tracks.includes(id)) {
      throw new NotInFavoritesException(EntityTitles.TRACK, id);
    }

    const idx = this.favorites.tracks.findIndex((id) => id === id);
    this.favorites.tracks = this.favorites.tracks.splice(idx, 1);
  }

  async addAlbum(id: string): Promise<void> {
    if (this.favorites.albums.includes(id)) {
      throw new AlreadyInFavoritesException(EntityTitles.ALBUM, id);
    }
    this.favorites.albums.push(id);
  }

  async removeAlbum(id: string): Promise<void> {
    if (!this.favorites.albums.includes(id)) {
      throw new NotInFavoritesException(EntityTitles.ALBUM, id);
    }

    const idx = this.favorites.albums.findIndex((id) => id === id);
    this.favorites.albums = this.favorites.albums.splice(idx, 1);
  }

  async addArtist(id: string): Promise<void> {
    if (this.favorites.artists.includes(id)) {
      throw new AlreadyInFavoritesException(EntityTitles.ALBUM, id);
    }
    this.favorites.artists.push(id);
  }

  async removeArtist(id: string): Promise<void> {
    if (!this.favorites.artists.includes(id)) {
      throw new NotInFavoritesException(EntityTitles.ALBUM, id);
    }

    const idx = this.favorites.artists.findIndex((id) => id === id);
    this.favorites.artists = this.favorites.artists.splice(idx, 1);
  }
}
