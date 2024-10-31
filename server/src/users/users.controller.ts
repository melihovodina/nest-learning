import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @ApiOperation({summary: 'get all users'})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiOperation({summary: 'creating a user'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }
}
