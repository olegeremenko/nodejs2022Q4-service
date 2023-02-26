import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import { EntityTitles } from '../favorites/entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.artistsRepository.create(createArtistDto);

    return await this.artistsRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    await this.artistsRepository.update(id, updateArtistDto);

    return await this.artistsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    await this.artistsRepository.delete(id);
  }
}
