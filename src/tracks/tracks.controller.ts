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
  UnprocessableEntityException,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    try {
      return await this.tracksService.create(createTrackDto);
    } catch (exception) {
      throw new UnprocessableEntityException(exception.message);
    }
  }

  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.tracksService.findOne(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return await this.tracksService.update(id, updateTrackDto);
    } catch (exception) {
      if (exception instanceof EntityNotFoundException) {
        throw new NotFoundException(exception.message);
      }
      throw new ForbiddenException(exception.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: 'ID is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.tracksService.remove(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }
}
