import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UnprocessableEntityException
} from '@nestjs/common';
import {AlbumsService} from './albums.service';
import {CreateAlbumDto} from './dto/create-album.dto';
import {UpdateAlbumDto} from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return await this.albumsService.create(createAlbumDto);
    } catch (exception) {
      throw new UnprocessableEntityException(exception.message);
    }
  }

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.albumsService.findOne(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.albumsService.update(id, updateAlbumDto);
    } catch (exception) {
      throw new ForbiddenException(exception.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.albumsService.remove(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }
}
