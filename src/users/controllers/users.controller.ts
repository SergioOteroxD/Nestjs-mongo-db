import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';

import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipePipe } from '../../common/mongo-id-pipe.pipe';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/model/role.model';

@UseGuards(JwtAuthGuard, RoleAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  get(@Param('id', MongoIdPipePipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', MongoIdPipePipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', MongoIdPipePipe) id: string) {
    return this.usersService.remove(id);
  }
}
