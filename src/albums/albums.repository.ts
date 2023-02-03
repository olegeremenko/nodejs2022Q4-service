import Repository from "../db/repository";
import {Injectable} from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import {Album} from "./entities/album.entity";
import {UpdateAlbumDto} from "./dto/update-album.dto";
import {CreateAlbumDto} from "./dto/create-album.dto";

@Injectable()
export class AlbumsRepository extends Repository<
  Album,
  UpdateAlbumDto,
  CreateAlbumDto
> {
  async create(dto: CreateAlbumDto) {
    const created: Album = {
      ...dto,
      id: uuid(),
    };

    this.entities.push(created);

    return created;
  }
}
