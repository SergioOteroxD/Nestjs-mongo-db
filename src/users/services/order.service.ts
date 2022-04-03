import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrder } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  getAll() {
    return 'a';
  }

  getOne(id: string) {
    return 'a';
  }

  create(data: CreateOrderDto) {
    return data;
  }

  update(id: string, change: UpdateOrder) {
    return id;
  }

  delete(id: string) {
    return id;
  }
}
