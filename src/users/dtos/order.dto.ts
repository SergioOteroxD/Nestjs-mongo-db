import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';
import { Product } from '../../products/entities/product.entity';

export class CreateOrderDto {
  @ApiProperty()
  readonly date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly user: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly product: string[];
}

export class UpdateOrder extends PartialType(CreateOrderDto) {}

export class AddProducttoOrder {
  @IsNotEmpty()
  @IsArray()
  readonly productIds: string[];
}
