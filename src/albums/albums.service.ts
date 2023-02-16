import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import { EntityTitles } from '../favorites/entities/favorite.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Album} from "./entities/album.entity";

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsRepository.create(createAlbumDto);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    return await this.albumsRepository.update(id, updateAlbumDto);
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    await this.albumsRepository.delete(id);
  }
}
