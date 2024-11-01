import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './createUser.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private roleService: RolesService
  ) {}

  async getAll() {
    const users = await this.userRepo.findAll({include: {all: true}});
    return users;
  }

  async getByEmail(email: string) {
  const user = await this.userRepo.findOne({where: {email}, include: {all: true}});
  return user;
  }
  
  async create(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto);
    const role = await this.roleService.getByValue('user')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;
  }
}
