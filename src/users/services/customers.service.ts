import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  findAll() {
    return 'this.customers';
  }

  findOne(id: number) {
    // if (!customer) {
    //   throw new NotFoundException(`Customer #${id} not found`);
    // }
    return 'customer';
  }

  create(data: CreateCustomerDto) {
    return 'newCustomer';
  }

  update(id: number, changes: UpdateCustomerDto) {
    return 'this.customers[index]';
  }

  remove(id: number) {
    return true;
  }
}
