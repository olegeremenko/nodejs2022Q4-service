import Repository from "../db/repository";
import {UpdateUserDto} from "./dto/update-user.dto";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./entities/user.entity";
import {Injectable} from "@nestjs/common";
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersRepository extends Repository<
  User,
  UpdateUserDto,
  CreateUserDto
> {
  async create(dto: CreateUserDto) {
    const created: User = {
      ...dto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      id: uuid(),
    };

    this.entities.push(created);

    return created;
  }
}
