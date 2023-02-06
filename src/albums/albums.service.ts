import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import { AlbumsRepository } from './albums.repository';
import { EntityTitles } from '../favorites/entities/favorite.entity';
import { Track } from '../tracks/entities/track.entity';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { TracksRepository } from '../tracks/tracks.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    private tracksRepository: TracksRepository,
    private albumsRepository: AlbumsRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsRepository.create(createAlbumDto);
  }

  async findAll() {
    return await this.albumsRepository.findMany();
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOne({
      key: 'id',
      equals: id,
    });

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOne({
      key: 'id',
      equals: id,
    });

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    return await this.albumsRepository.update(id, updateAlbumDto);
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumsRepository.findOne({
      key: 'id',
      equals: id,
    });

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    try {
      await this.favoritesRepository.removeArtist(id);
    } catch (e) {}

    const tracks = await this.tracksRepository.findMany({
      key: 'albumId',
      equals: id,
    });
    tracks.map(async (track: Track) => {
      track.albumId = null;
      await this.tracksRepository.update(track.id, track);
    });

    await this.albumsRepository.delete(id);
  }
}
