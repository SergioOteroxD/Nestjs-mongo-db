import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}
  async findAll() {
    const products = await this.customerModel.find().exec();
    return products;
  }

  async findOne(id: string) {
    const product = await this.customerModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateCustomerDto) {
    const product = await new this.customerModel(data);
    return product.save();
  }

  async update(id: string, changes: UpdateCustomerDto) {
    const product = await this.customerModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    return product;
  }

  async remove(id: string) {
    await this.customerModel.findByIdAndDelete(id).exec();
    return true;
  }
}
