import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoritesService.addTrack(id);
    } catch (exception) {
      if (exception instanceof EntityNotFoundException) {
        throw new UnprocessableEntityException(exception.message);
      }
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoritesService.removeTrack(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoritesService.addAlbum(id);
    } catch (exception) {
      if (exception instanceof EntityNotFoundException) {
        throw new UnprocessableEntityException(exception.message);
      }
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoritesService.removeAlbum(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoritesService.addArtist(id);
    } catch (exception) {
      if (exception instanceof EntityNotFoundException) {
        throw new UnprocessableEntityException(exception.message);
      }
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoritesService.removeArtist(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }
}
