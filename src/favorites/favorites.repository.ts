import {Injectable} from "@nestjs/common";
import {EntityTitles, Favorite} from "./entities/favorite.entity";
import AlreadyInFavoritesException from "../exceptions/already-in-favorites.exception";
import NotInFavoritesException from "../exceptions/not-in-favorites.exception";

@Injectable()
export class FavoritesRepository {
  favorites: Favorite;

  constructor() {
    this.favorites = new Favorite();
  }

  async findAll() {
    return this.favorites;
  }

  async addTrack(id: string) {
    if (this.favorites.tracks.includes(id)) {
      throw new AlreadyInFavoritesException(EntityTitles.TRACK, id);
    }
    this.favorites.tracks.push(id);
  }

  async removeTrack(id: string) {
    if (!this.favorites.tracks.includes(id)) {
      throw new NotInFavoritesException(EntityTitles.TRACK, id);
    }

    const idx = this.favorites.tracks.findIndex(id => id === id);
    this.favorites.tracks.splice(idx, 1);
  }

  async addAlbum(id: string) {
    if (this.favorites.albums.includes(id)) {
      throw new AlreadyInFavoritesException(EntityTitles.ALBUM, id);
    }
    this.favorites.albums.push(id);
  }

  async removeAlbum(id: string) {
    if (!this.favorites.albums.includes(id)) {
      throw new NotInFavoritesException(EntityTitles.ALBUM, id);
    }

    const idx = this.favorites.albums.findIndex(id => id === id);
    this.favorites.albums.splice(idx, 1);
  }

  async addArtist(id: string) {
    if (this.favorites.artists.includes(id)) {
      throw new AlreadyInFavoritesException(EntityTitles.ALBUM, id);
    }
    this.favorites.artists.push(id);
  }

  async removeArtist(id: string) {
    if (!this.favorites.artists.includes(id)) {
      throw new NotInFavoritesException(EntityTitles.ALBUM, id);
    }

    const idx = this.favorites.artists.findIndex(id => id === id);
    this.favorites.artists.splice(idx, 1);
  }
}
