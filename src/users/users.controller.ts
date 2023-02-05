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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The user has been created' })
  @ApiBadRequestResponse({
    description: 'Body does not contain required fields',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'ID is invalid (not uuid)' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }

  @Put(':id')
  @ApiBadRequestResponse({ description: 'ID is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    try {
      return await this.usersService.changePassword(id, changePasswordDto);
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
  @ApiNotFoundResponse({ description: 'User not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.usersService.remove(id);
    } catch (exception) {
      throw new NotFoundException(exception.message);
    }
  }
}
