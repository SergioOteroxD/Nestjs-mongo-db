import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth.guard';

import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/model/role.model';
import { Public } from 'src/auth/decorators/public.decorator';

import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipePipe } from '../../common/mongo-id-pipe.pipe';

import { CategoriesService } from '../services/categories.service';

import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dtos';

@ApiTags('Category')
@UseGuards(JwtAuthGuard, RoleAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @Public()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Public()
  get(@Param('id', MongoIdPipePipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', MongoIdPipePipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', MongoIdPipePipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
