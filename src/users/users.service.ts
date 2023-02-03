import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from "./users.repository";
import EntityNotFoundException from "../exceptions/entity.not.found.exception";
import InvalidPasswordException from "../exceptions/invalid.password.exception";
import {ChangePasswordDto} from "./dto/change-password.dto";

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
      throw new EntityNotFoundException(`User with ID [${id}] not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!user) {
      throw new EntityNotFoundException(`User with ID [${id}] not found`);
    }

    return 'No action for update for now';
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!user) {
      throw new EntityNotFoundException(`User with ID [${id}] not found`);
    }

    if (user.password !== changePasswordDto.oldPassword) {
      throw new InvalidPasswordException();
    }

    return await this.usersRepository.update(id, {
      password: changePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now()
    });
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!user) {
      throw new EntityNotFoundException(`User with ID [${id}] not found`);
    }

    return await this.usersRepository.delete(id);
  }
}
