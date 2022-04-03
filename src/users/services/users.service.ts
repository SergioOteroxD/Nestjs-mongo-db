import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}

  findAll() {
    return 'this.users';
  }

  findOne(id: number) {
    // if (!user) {
    //   throw new NotFoundException(`User #${id} not found`);
    // }
    return 'user';
  }

  create(data: CreateUserDto) {
    return 'newUser';
  }

  update(id: number, changes: UpdateUserDto) {
    return 'this.users[index]';
  }

  remove(id: number) {
    return true;
  }

  // getOrderByUser(id: number): Order {
  //   const user = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: this.productsService.findAll(),
  //   };
  // }
}
