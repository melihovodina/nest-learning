import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/createRole.dto';
import { Role } from './models/role.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({summary: 'get role info by value'})
  @ApiResponse({status: 200, type: Role})
  @Get('/:value')
  getByValue(@Param('value') value:string) {
    return this.rolesService.getByValue(value)
  }

  @ApiOperation({summary: 'create a role'})
  @ApiResponse({status: 201, type: Role})
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto)
  }
}
