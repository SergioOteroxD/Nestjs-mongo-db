import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  CreateOrderDto,
  UpdateOrder,
  AddProducttoOrder,
} from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  async findAll() {
    const order = await this.orderModel.find().populate(['user']).exec();
    return order;
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = await new this.orderModel(data);
    return order.save();
  }

  async update(id: string, changes: UpdateOrder) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    return order;
  }

  async addProductToOrder(orderId: string, newProducts: string[]) {
    const order = await this.findOne(orderId);
    newProducts.forEach((idP) => order.products.push(idP));
    return await (await order.save()).populate('user');
  }

  async remove(id: string) {
    await this.orderModel.findByIdAndDelete(id).exec();
    return true;
  }

  async removeProductToOrder(orderId: string, productId: string) {
    const order = await this.findOne(orderId);
    order.products.pull(productId);
    return order.save();
  }
}
