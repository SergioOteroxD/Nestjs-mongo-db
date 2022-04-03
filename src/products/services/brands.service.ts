import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  findAll() {
    return 'this.brands';
  }

  findOne(id: number) {
    // if (!product) {
    //   throw new NotFoundException(`Brand #${id} not found`);
    // }
    return 'product';
  }

  create(data: CreateBrandDto) {
    return 'newBrand';
  }

  update(id: number, changes: UpdateBrandDto) {
    return 'his.brands[index]';
  }

  remove(id: number) {
    return true;
  }
}
