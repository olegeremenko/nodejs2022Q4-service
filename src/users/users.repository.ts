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

  async update(id: string, dto: UpdateUserDto) {
    const idx = this.entities.findIndex((entity) => entity.id === id);

    if (idx === -1) {
      throw new Error('update');
    }

    const user = await this.findOne({
      key: 'id',
      equals: id
    });
    const updateUserDto: Omit<User, 'id' | 'login' | 'createdAt'> = {
      ...dto,
      updatedAt: Date.now(),
      version: user.version + 1
    };

    const changed = { ...this.entities[idx], ...updateUserDto };
    this.entities.splice(idx, 1, changed);

    return changed;
  }
}
