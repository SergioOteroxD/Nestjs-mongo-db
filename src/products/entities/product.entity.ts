import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  id: number;

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
}
