import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import EntityNotFoundException from "../exceptions/entity.not.found.exception";
import {TracksRepository} from "./tracks.repository";
import {EntityTitles} from "../favorites/entities/favorite.entity";

@Injectable()
export class TracksService {
  constructor(private tracksRepository: TracksRepository) {
  }

  async create(createTrackDto: CreateTrackDto) {
    return await this.tracksRepository.create(createTrackDto);
  }

  async findAll() {
    return await this.tracksRepository.findMany();
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne({
      key: 'id',
      equals: id
    });

    if (!track) {
      throw new EntityNotFoundException(EntityTitles.TRACK, id);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.tracksRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!track) {
      throw new EntityNotFoundException(EntityTitles.TRACK, id);
    }

    return await this.tracksRepository.update(id, updateTrackDto);
  }

  async remove(id: string) {
    const track = await this.tracksRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!track) {
      throw new EntityNotFoundException(EntityTitles.TRACK, id);
    }

    return await this.tracksRepository.delete(id);
  }
}
