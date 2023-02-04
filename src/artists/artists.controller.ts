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
import {ArtistsService} from './artists.service';
import {CreateArtistDto} from './dto/create-artist.dto';
import {UpdateArtistDto} from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    try {
      return await this.artistsService.create(createArtistDto);
    } catch (exception) {
      throw new UnprocessableEntityException(exception.message);
    }
  }

  @Get()
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.artistsService.findOne(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateArtistDto: UpdateArtistDto) {
    try {
      return await this.artistsService.update(id, updateArtistDto);
    } catch (exception) {
      throw new ForbiddenException(exception.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.artistsService.remove(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }
}
