import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ default: Date.now })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
