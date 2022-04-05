import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop()
  image: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Category.name }] })
  category: Types.Array<Category>;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
