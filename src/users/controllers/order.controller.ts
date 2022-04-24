import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipePipe } from '../../common/mongo-id-pipe.pipe';

import { OrderService } from '../services/order.service';
import { CreateOrderDto, UpdateOrder } from '../dtos/order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  getAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', MongoIdPipePipe) id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipePipe) id: string,
    @Body() changes: UpdateOrder,
  ) {
    return this.orderService.update(id, changes);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipePipe) id: string) {
    return this.orderService.remove(id);
  }
}
