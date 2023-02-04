import Repository from '../db/repository';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksRepository extends Repository<
  Track,
  UpdateTrackDto,
  CreateTrackDto
> {
  async create(dto: CreateTrackDto) {
    const created: Track = {
      ...dto,
      id: uuid(),
    };

    this.entities.push(created);

    return created;
  }
}
