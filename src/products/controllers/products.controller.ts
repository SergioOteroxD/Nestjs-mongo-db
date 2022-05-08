import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MongoIdPipePipe } from '../../common/mongo-id-pipe.pipe';

import { ProductsService } from './../services/products.service';
import {
  CreateProductDto,
  FiltrarProduct,
  UpdateProductDto,
} from '../dtos/products.dtos';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth.guard';

import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/role.decorator';
import { Role } from 'src/auth/model/role.model';

@ApiTags('products')
@UseGuards(JwtAuthGuard, RoleAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'List of products' })
  @Get()
  @Public()
  getProducts(@Query() param: FiltrarProduct) {
    return this.productsService.findAll(param);
  }

  @Get(':productId')
  @Public()
  getOne(@Param('productId', MongoIdPipePipe) productId: string) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return this.productsService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', MongoIdPipePipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', MongoIdPipePipe) id: string) {
    return this.productsService.remove(id);
  }
}
