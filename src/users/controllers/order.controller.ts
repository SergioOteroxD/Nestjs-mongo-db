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
import {
  CreateOrderDto,
  UpdateOrder,
  AddProducttoOrder,
} from '../dtos/order.dto';

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

  @Put(':id/product')
  addProductToOrder(
    @Param('id', MongoIdPipePipe) id: string,
    @Body() changes: AddProducttoOrder,
  ) {
    return this.orderService.addProductToOrder(id, changes.productIds);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipePipe) id: string) {
    return this.orderService.remove(id);
  }

  @Delete(':orderId/product/:productId')
  deleteProductToOrder(
    @Param('orderId', MongoIdPipePipe) orderId: string,
    @Param('productId', MongoIdPipePipe) productId: string,
  ) {
    return this.orderService.removeProductToOrder(orderId, productId);
  }
}
