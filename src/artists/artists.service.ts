import {Injectable} from '@nestjs/common';
import {CreateArtistDto} from './dto/create-artist.dto';
import {UpdateArtistDto} from './dto/update-artist.dto';
import {ArtistsRepository} from "./artists.repository";
import EntityNotFoundException from "../exceptions/entity.not.found.exception";
import {EntityTitles} from "../favorites/entities/favorite.entity";

@Injectable()
export class ArtistsService {
  constructor(private artistsRepository: ArtistsRepository) {
  }

  async create(createArtistDto: CreateArtistDto) {
    return await this.artistsRepository.create(createArtistDto);
  }

  async findAll() {
    return await this.artistsRepository.findMany();
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOne({
      key: 'id',
      equals: id
    });

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistsRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    return await this.artistsRepository.update(id, updateArtistDto);
  }

  async remove(id: string) {
    const artist = await this.artistsRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!artist) {
      throw new EntityNotFoundException(EntityTitles.ARTIST, id);
    }

    return await this.artistsRepository.delete(id);
  }
}
