import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateOrderDto, UpdateOrder } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  async findAll() {
    const user = await this.orderModel.find().exec();
    return user;
  }

  async findOne(id: string) {
    const user = await this.orderModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return user;
  }

  async create(data: CreateOrderDto) {
    const user = await new this.orderModel(data);
    return user.save();
  }

  async update(id: string, changes: UpdateOrder) {
    const user = await this.orderModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    return user;
  }

  async remove(id: string) {
    await this.orderModel.findByIdAndDelete(id).exec();
    return true;
  }
}
