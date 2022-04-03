import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop()
  id: number;

  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
