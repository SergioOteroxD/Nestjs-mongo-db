import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { ProductService } from '../services/product.service';
import { CreateProduct, UpdateProduct } from '../dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async findAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateProduct) {
    return this.productService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() changes: UpdateProduct) {
    return this.productService.update(id, changes);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
