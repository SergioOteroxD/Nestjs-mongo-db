import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './../entity/product.entity';
import { Model } from 'mongoose';
import { CreateProduct, UpdateProduct } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<typeof Product>,
  ) {}

  async getAll() {
    const products = await this.productModel.find().exec();
    return products;
  }

  async getOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`el producto no fue encontrado`);
    }
    return product;
  }

  async create(data: CreateProduct) {
    const product = await new this.productModel(data);
    return product.save();
  }

  async update(id: string, changes: UpdateProduct) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    return product;
  }

  async delete(id: string) {
    await this.productModel.findByIdAndDelete(id).exec();
    return true;
  }
}
