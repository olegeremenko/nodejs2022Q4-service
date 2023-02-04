import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from "./users.repository";
import EntityNotFoundException from "../exceptions/entity.not.found.exception";
import InvalidPasswordException from "../exceptions/invalid.password.exception";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {EntityTitles} from "../favorites/entities/favorite.entity";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.findMany();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      key: 'id',
      equals: id
    });

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    return 'No action for update for now';
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    if (user.password !== changePasswordDto.oldPassword) {
      throw new InvalidPasswordException();
    }

    return await this.usersRepository.update(id, {
      password: changePasswordDto.newPassword
    });
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    return await this.usersRepository.delete(id);
  }
}
