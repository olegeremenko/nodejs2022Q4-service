import {Controller, Get, Post, Param, Delete, HttpException, HttpStatus, HttpCode, ParseUUIDPipe} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import AlreadyInFavoritesException from "../exceptions/already-in-favorites.exception";

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  private processException(exception) {
    let httpStatus = HttpStatus.NOT_FOUND;

    if (exception instanceof AlreadyInFavoritesException) {
      httpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    throw new HttpException(exception.message, httpStatus);
  }

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
      this.processException(exception);
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoritesService.removeTrack(id);
    } catch (exception) {
      this.processException(exception);
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoritesService.addAlbum(id);
    } catch (exception) {
      this.processException(exception);
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoritesService.removeAlbum(id);
    } catch (exception) {
      this.processException(exception);
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoritesService.addArtist(id);
    } catch (exception) {
      this.processException(exception);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoritesService.removeArtist(id);
    } catch (exception) {
      this.processException(exception);
    }
  }
}
