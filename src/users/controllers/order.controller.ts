import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, UpdateOrder } from '../dtos/order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  getAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() changes: UpdateOrder) {
    return this.orderService.update(id, changes);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
