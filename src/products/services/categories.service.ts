import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  findAll() {
    return 'a';
  }

  findOne(id: number) {
    // if (!category) {
    //   throw new NotFoundException(`Category #${id} not found`);
    // }
    return 'a';
  }

  create(data: CreateCategoryDto) {
    return 'newCategory';
  }

  update(id: number, changes: UpdateCategoryDto) {
    return 'this.categories[index]';
  }

  remove(id: number) {
    return true;
  }
}
