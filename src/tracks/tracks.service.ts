import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import { EntityTitles } from '../favorites/entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.tracksRepository.create(createTrackDto);

    return await this.tracksRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new EntityNotFoundException(EntityTitles.TRACK, id);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new EntityNotFoundException(EntityTitles.TRACK, id);
    }

    await this.tracksRepository.update(id, updateTrackDto);

    return await this.tracksRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new EntityNotFoundException(EntityTitles.TRACK, id);
    }

    await this.tracksRepository.delete(id);
  }
}
