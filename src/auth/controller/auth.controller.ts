import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';
import { CreateUserDto } from '../../users/dtos/user.dto';
import { UsersService } from '../../users/services/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    const res = this.authService.generateJWT(user);
    //console.log(`controlador: ${req}`);
    return res;
  }
  @Post('sigin')
  sigin(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }
}
