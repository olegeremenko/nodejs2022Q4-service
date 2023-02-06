import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { AlbumsRepository } from '../albums/albums.repository';
import { EntityTitles, Favorite, Favorites } from './entities/favorite.entity';
import { ArtistsRepository } from '../artists/artists.repository';
import { TracksRepository } from '../tracks/tracks.repository';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    private albumsRepository: AlbumsRepository,
    private artistsRepository: ArtistsRepository,
    private tracksRepository: TracksRepository,
  ) {}

  async findAll(): Promise<Favorites> {
    const favorites: Favorite = await this.favoritesRepository.findAll();

    return {
      albums: await this.albumsRepository.findMany({
        key: 'id',
        equalsAnyOf: favorites.albums,
      }),
      artists: await this.artistsRepository.findMany({
        key: 'id',
        equalsAnyOf: favorites.artists,
      }),
      tracks: await this.tracksRepository.findMany({
        key: 'id',
        equalsAnyOf: favorites.tracks,
      }),
    };
  }

  async addTrack(id: string): Promise<void> {
    const track = await this.tracksRepository.findOne({
      key: 'id',
      equals: id,
    });

    if (!track) {
      throw new EntityNotFoundException(EntityTitles.TRACK, id);
    }

    await this.favoritesRepository.addTrack(id);
  }

  async removeTrack(id: string): Promise<void> {
    await this.favoritesRepository.removeTrack(id);
  }

  async addAlbum(id: string): Promise<void> {
    if (!(await this.albumsRepository.findOne({ key: 'id', equals: id }))) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }
    await this.favoritesRepository.addAlbum(id);
  }

  async removeAlbum(id: string): Promise<void> {
    await this.favoritesRepository.removeAlbum(id);
  }

  async addArtist(id: string): Promise<void> {
    if (!(await this.artistsRepository.findOne({ key: 'id', equals: id }))) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }
    await this.favoritesRepository.addArtist(id);
  }

  async removeArtist(id: string): Promise<void> {
    await this.favoritesRepository.removeArtist(id);
  }
}
