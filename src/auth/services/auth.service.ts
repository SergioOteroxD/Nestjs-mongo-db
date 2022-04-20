import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from 'src/users/services/users.service';

import * as bcrypt from 'bcrypt';
import { FindEmail } from '../../users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService){}
  async validateUser(email: FindEmail, password: string){
    const authUser = await this.userService.findEmail(email);
    if (!authUser) {
      throw new NotFoundException(`Email ${email.email} not found`);
    }
    const authPass = await bcrypt.compare(authUser.password, password);
    if (!authPass) {
      throw new NotFoundException('Password wrong!');
    }
    return authUser;
  }
}
