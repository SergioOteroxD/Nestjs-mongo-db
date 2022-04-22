import { Injectable, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/services/users.service';

import { FindEmail } from '../../users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
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
}
