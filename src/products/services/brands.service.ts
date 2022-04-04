import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}
  async findAll() {
    const brand = await this.brandModel.find().exec();
    return brand;
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const brand = await new this.brandModel(data);
    return brand.save();
  }

  async update(id: string, changes: UpdateBrandDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    return brand;
  }

  async remove(id: string) {
    await this.brandModel.findByIdAndDelete(id).exec();
    return true;
  }
}
