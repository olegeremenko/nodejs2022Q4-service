import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from "./users.repository";
import EntityNotFoundException from "../exceptions/entity.not.found.exception";
import InvalidPasswordException from "../exceptions/invalid.password.exception";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {EntityTitles} from "../favorites/entities/favorite.entity";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {
  }

  private filterPassword(user: User): Omit<User, 'password'> {
    const {password, ...userWithoutPassword} = user;

    return userWithoutPassword;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);

    return this.filterPassword(newUser);
  }

  async findAll() {
    const users = await this.usersRepository.findMany();

    return users.map(user => this.filterPassword(user));
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      key: 'id',
      equals: id
    });

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    return this.filterPassword(user);
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

    const updatedUser = await this.usersRepository.update(id, {
      password: changePasswordDto.newPassword
    });

    return this.filterPassword(updatedUser);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({
      key: 'id',
      equals: id
    })

    if (!user) {
      throw new EntityNotFoundException(EntityTitles.USER, id);
    }

    await this.usersRepository.delete(id);
  }
}
