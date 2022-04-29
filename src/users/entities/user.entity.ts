import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { Role } from '../../auth/model/role.model';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @ExcludeProperty()
  @Prop({ required: true })
  password: string;

  @Prop({ default: Role.CUSTOMER, enum: [Role.ADMIN, Role.CUSTOMER] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
