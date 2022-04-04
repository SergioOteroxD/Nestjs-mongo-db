import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async findAll() {
    const products = await this.categoryModel.find().exec();
    return products;
  }

  async findOne(id: string) {
    const product = await this.categoryModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateCategoryDto) {
    const product = await new this.categoryModel(data);
    return product.save();
  }

  async update(id: string, changes: UpdateCategoryDto) {
    const product = await this.categoryModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    return product;
  }

  async remove(id: string) {
    await this.categoryModel.findByIdAndDelete(id).exec();
    return true;
  }
}
