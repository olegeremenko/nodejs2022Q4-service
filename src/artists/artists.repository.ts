import Repository from '../db/repository';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsRepository extends Repository<
  Artist,
  UpdateArtistDto,
  CreateArtistDto
> {
  async create(dto: CreateArtistDto) {
    const created: Artist = {
      ...dto,
      id: uuid(),
    };

    this.entities.push(created);

    return created;
  }
}
