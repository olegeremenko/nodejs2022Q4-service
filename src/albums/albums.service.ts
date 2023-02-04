import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import EntityNotFoundException from "../exceptions/entity.not.found.exception";
import {AlbumsRepository} from "./albums.repository";
import {EntityTitles} from "../favorites/entities/favorite.entity";

@Injectable()
export class AlbumsService {
  constructor(private albumsRepository: AlbumsRepository) {
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumsRepository.create(createAlbumDto);
  }

  async findAll() {
    return await this.albumsRepository.findMany();
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOne({
      key: 'id',
      equals: id
    });

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    return await this.albumsRepository.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    const album = await this.albumsRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!album) {
      throw new EntityNotFoundException(EntityTitles.ALBUM, id);
    }

    return await this.albumsRepository.delete(id);
  }
}
