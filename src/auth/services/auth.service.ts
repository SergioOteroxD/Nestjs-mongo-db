import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/services/users.service';

import { FindEmail } from '../../users/dtos/user.dto';
import { User } from '../../users/entities/user.entity';
import { TokenModel } from '../../auth/model/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const authUser = await this.userService.findEmail(email);
    console.log(`email: ${authUser}`);
    if (!authUser) {
      return null;
    }
    const authPass = await bcrypt.compare(password, authUser.password);
    console.log(`password: ${authPass}`);
    if (!authPass) {
      throw null;
    }
    return authUser;
  }
  generateJWT(user: User) {
    const payload: TokenModel = { role: user.role, sub: user.id };
    return {
      acces_token: this.jwtService.sign(payload),
      user,
    };
  }
}
