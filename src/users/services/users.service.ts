import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    const user = await this.userModel.find().exec();
    return user;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const user = await new this.userModel(data);
    return user.save();
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    return user;
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
    return true;
  }
}
