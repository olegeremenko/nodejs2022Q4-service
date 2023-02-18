import { Injectable } from '@nestjs/common';
import { EntityTitles, Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  private async getFavorites(): Promise<Favorite> {
    const [favorites] = await this.favoritesRepository.find({
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });

    return favorites;
  }

  async findAll(): Promise<Favorite> {
    let favorites = await this.getFavorites();

    if (!favorites) {
      await this.favoritesRepository.save(new Favorite());

      favorites = await this.getFavorites();
    }

    return favorites;
  }

  async addTrack(id: string): Promise<void> {
    const favorites = await this.findAll();
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new EntityNotFoundException(EntityTitles.TRACK, id);
    }

    if (!favorites.tracks.includes(track)) {
      favorites.tracks.push(track);
    }

    await this.favoritesRepository.save(favorites);
  }

  async removeTrack(id: string): Promise<void> {
    const favorites = await this.findAll();
    const trackIndex = favorites.tracks.findIndex((track) => track.id == id);

    if (trackIndex !== -1) {
      favorites.tracks.splice(trackIndex, 1);
      await this.favoritesRepository.save(favorites);
    }
  }

  async addAlbum(id: string): Promise<void> {
    const favorites = await this.findAll();
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    if (!favorites.albums.includes(album)) {
      favorites.albums.push(album);
    }

    await this.favoritesRepository.save(favorites);
  }

  async removeAlbum(id: string): Promise<void> {
    const favorites = await this.findAll();
    const albumIndex = favorites.albums.findIndex((album) => album.id == id);

    if (albumIndex !== -1) {
      favorites.albums.splice(albumIndex, 1);
      await this.favoritesRepository.save(favorites);
    }
  }

  async addArtist(id: string): Promise<void> {
    const favorites = await this.findAll();
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    if (!favorites.artists.includes(artist)) {
      favorites.artists.push(artist);
    }

    await this.favoritesRepository.save(favorites);
  }

  async removeArtist(id: string): Promise<void> {
    const favorites = await this.findAll();
    const artistIndex = favorites.artists.findIndex(
      (artist) => artist.id == id,
    );

    if (artistIndex !== -1) {
      favorites.artists.splice(artistIndex, 1);
      await this.favoritesRepository.save(favorites);
    }
  }
}
