import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles }
    return {
        token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getByEmail(userDto.email)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    
    if (user && passwordEquals) {
      return user
    }
    
    throw new UnauthorizedException({meassage: "Wrong email or password"})
  }

  async registration(userDto: CreateUserDto) {
    const candidate = (await this.usersService.getByEmail(userDto.email));
    
    if(candidate) {
      throw new HttpException('that email in use already', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.create({...userDto, password: hashPassword})
    
    return this.generateToken(user)
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }
}