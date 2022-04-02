import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { UserController } from './controllers/user.controller';
import { OrderController } from './controllers/order.controller';

@Module({
  providers: [UserService, OrderService],
  controllers: [UserController, OrderController],
})
export class UserModule {}
