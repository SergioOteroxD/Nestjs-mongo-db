import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto, FindEmail } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

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

  async findEmail(findemail: string) {
    const email = findemail;
    return await this.userModel.findOne({ email: email }).exec();
  }

  async create(data: CreateUserDto) {
    const user = new this.userModel(data);
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
    return await user.save();
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, changes, { new: true })
      .exec();
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    await this.userModel.findByIdAndDelete(id).exec();
    return true;
  }
}
