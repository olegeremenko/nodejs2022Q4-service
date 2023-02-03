import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import EntityNotFoundException from "../exceptions/entity.not.found.exception";
import {AlbumsRepository} from "./albums.repository";

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
      throw new EntityNotFoundException(`Album with ID [${id}] not found`);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!album) {
      throw new EntityNotFoundException(`Album with ID [${id}] not found`);
    }

    return await this.albumsRepository.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    const album = await this.albumsRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!album) {
      throw new EntityNotFoundException(`Album with ID [${id}] not found`);
    }

    return await this.albumsRepository.delete(id);
  }
}
