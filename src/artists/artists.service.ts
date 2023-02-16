import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import { EntityTitles } from '../favorites/entities/favorite.entity';
import { FavoritesRepository } from '../favorites/favorites.repository';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Artist} from "./entities/artist.entity";

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistsRepository.create(createArtistDto);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    return await this.artistsRepository.update(id, updateArtistDto);
  }

  async remove(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    await this.artistsRepository.delete(id);
  }
}
