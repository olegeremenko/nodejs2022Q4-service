import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  HttpCode
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return await this.albumsService.create(createAlbumDto);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.albumsService.findOne(id);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.albumsService.update(id, updateAlbumDto);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return await this.albumsService.remove(id);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.NOT_FOUND);
    }
  }
}
