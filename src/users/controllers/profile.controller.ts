import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

// Guards
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';

import { Role } from 'src/auth/model/role.model';
import { Roles } from 'src/auth/decorators/role.decorator';

import { TokenModel } from 'src/auth/model/token.model';
import { OrderService } from '../services/order.service';

@ApiTags('Profile')
@UseGuards(JwtAuthGuard, RoleAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrderService) {}
  @Get('my-order')
  @Roles(Role.CUSTOMER)
  findOrderByUser(@Req() req: Request) {
    const user = req.user as TokenModel;
    return this.orderService.findOrderByUser(user.sub);
  }
}
