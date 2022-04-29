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
import { RoleAuthGuard } from '../../auth/guards/role-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipePipe } from '../../common/mongo-id-pipe.pipe';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/model/role.model';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('brands')
@UseGuards(JwtAuthGuard, RoleAuthGuard)
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @Public()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @Public()
  get(@Param('id', MongoIdPipePipe) id: string) {
    return this.brandsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', MongoIdPipePipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', MongoIdPipePipe) id: string) {
    return this.brandsService.remove(id);
  }
}
