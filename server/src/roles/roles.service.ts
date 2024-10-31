import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './createRole.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async getByValue(value: string) {
    const role = await this.roleRepo.findOne({where: {value}})
    return role;
  }
  
  async create(dto: CreateRoleDto) {
    const role = await this.roleRepo.create(dto);
    return role;
  }
}
