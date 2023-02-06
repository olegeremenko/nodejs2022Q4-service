import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepository } from './artists.repository';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import { EntityTitles } from '../favorites/entities/favorite.entity';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { TracksRepository } from '../tracks/tracks.repository';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class ArtistsService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    private artistsRepository: ArtistsRepository,
    private tracksRepository: TracksRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistsRepository.create(createArtistDto);
  }

  async findAll() {
    return await this.artistsRepository.findMany();
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOne({
      key: 'id',
      equals: id,
    });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistsRepository.findOne({
      key: 'id',
      equals: id,
    });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    return await this.artistsRepository.update(id, updateArtistDto);
  }

  async remove(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOne({
      key: 'id',
      equals: id,
    });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    try {
      await this.favoritesRepository.removeArtist(id);
    } catch (e) {}

    const tracks = await this.tracksRepository.findMany({
      key: 'artistId',
      equals: id,
    });
    tracks.map(async (track: Track) => {
      track.artistId = null;
      await this.tracksRepository.update(track.id, track);
    });

    await this.artistsRepository.delete(id);
  }
}
