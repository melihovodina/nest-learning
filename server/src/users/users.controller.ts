import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { GiveRoleDto } from './dtos/giveRole.dto';
import { BanDto } from './dtos/ban.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @ApiOperation({summary: 'get all users'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiOperation({summary: 'creatе an user'})
  @ApiResponse({status: 201, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({summary: 'give a role to an user'})
  @ApiResponse({status: 201, type: User})
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/role')
  giveRole(@Body() dto: GiveRoleDto) {
    return this.usersService.giveRole(dto);
  }

  @ApiOperation({summary: 'give a role to an user'})
  @ApiResponse({status: 201, type: User})
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanDto) {
    return this.usersService.ban(dto);
  }
}
