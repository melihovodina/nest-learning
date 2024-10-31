import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto);
    return user;
  }

  async getAll() {
    const users = await this.userRepo.findAll();
    return users;
  }
}
