import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  findAll() {
    return 'a';
  }

  findOne(id: number) {
    if (10) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return 'a';
  }

  create(data: CreateProductDto) {
    return 'a';
  }

  update(id: number, changes: UpdateProductDto) {
    return 'a';
  }

  remove(id: number) {
    // if (index === -1) {
    //   throw new NotFoundException(`Product #${id} not found`);
    // }
    return true;
  }
}
