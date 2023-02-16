import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import InvalidPasswordException from '../exceptions/invalid.password.exception';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EntityTitles } from '../favorites/entities/favorite.entity';
import { User } from './entities/user.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);

    return (await this.usersRepository.save(newUser)).toResponse();
  }

  async findAll() {
    const users = await this.usersRepository.find();

    return users.map((user) => user.toResponse());
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    return user.toResponse();
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    if (user.password !== changePasswordDto.oldPassword) {
      throw new InvalidPasswordException();
    }

    const updatedUser = await this.usersRepository.update(id, {
      password: changePasswordDto.newPassword,
      version: user.version + 1
    });

    return user.toResponse();
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    await this.usersRepository.delete(id);
  }
}
