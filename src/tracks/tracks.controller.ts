import {Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {TracksService} from './tracks.service';
import {CreateTrackDto} from './dto/create-track.dto';
import {UpdateTrackDto} from './dto/update-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    try {
      return await this.tracksService.create(createTrackDto);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.tracksService.findOne(id);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    try {
      return await this.tracksService.update(id, updateTrackDto);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return await this.tracksService.remove(id);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.NOT_FOUND);
    }
  }
}
