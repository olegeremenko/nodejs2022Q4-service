import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  Put,
  HttpCode
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from "./dto/change-password.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() changePasswordDto: ChangePasswordDto) {
    try {
      return await this.usersService.changePassword(id, changePasswordDto);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.usersService.remove(id);
    } catch (exception) {
      throw new HttpException(exception.message, HttpStatus.NOT_FOUND);
    }
  }
}
