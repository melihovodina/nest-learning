import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './createRole.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('/:value')
  getByValue(@Param('value') value:string) {
    return this.rolesService.getByValue(value)
  }

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto)
  }
}
