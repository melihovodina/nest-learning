import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dtos/createUser.dto';
import { RolesService } from 'src/roles/roles.service';
import { GiveRoleDto } from './dtos/giveRole.dto';
import { BanDto } from './dtos/ban.dto';

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

  async giveRole(dto: GiveRoleDto) {
    const user = await this.userRepo.findByPk(dto.userId);
    const role = await this.roleService.getByValue(dto.value);
    
    if(role && user) {
      await user.$add('role', role.id)
      return dto;
    }
    throw new HttpException('user or role does not exist', HttpStatus.NOT_FOUND)
  }

  async ban(dto: BanDto) {
    const user = await this.userRepo.findByPk(dto.userId)

    if(!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
