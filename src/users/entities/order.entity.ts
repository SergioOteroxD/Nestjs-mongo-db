import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop()
  date: Date;

  @Prop()
  user: User;

  @Prop()
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
