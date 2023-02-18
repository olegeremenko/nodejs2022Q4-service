import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import EntityNotFoundException from '../exceptions/entity.not.found.exception';
import InvalidPasswordException from '../exceptions/invalid.password.exception';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EntityTitles } from '../favorites/entities/favorite.entity';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    return user;
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    if (user.password !== changePasswordDto.oldPassword) {
      throw new InvalidPasswordException();
    }

    await this.usersRepository.update(id, {
      updatedAt: Math.floor(Date.now() / 1000),
      password: changePasswordDto.newPassword,
      version: user.version + 1,
    });

    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    await this.usersRepository.delete(id);
  }
}
