import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';

import { ROLE_KEY } from '../decorators/role.decorator';
import { Role } from '../model/role.model';
import { TokenModel } from '../model/token.model';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isRole = this.reflector.get<Role[]>(ROLE_KEY, context.getHandler());
    //console.log(isRole);
    if (!isRole) {
      return true;
    }

    const reques = context.switchToHttp().getRequest();
    const user = reques.user as TokenModel;

    console.log(`Role ${user.role}`);
    const isAuth = isRole.some((item) => item === user.role);
    if (!isAuth) {
      throw new UnauthorizedException('No tienes el rol');
    }
    return isAuth;
  }
}
