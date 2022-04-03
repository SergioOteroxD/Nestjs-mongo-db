import { IsArray, IsDate, ValidateNested } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';
import { Product } from '../../products/entities/product.entity';

export class CreateOrderDto {
  @ApiProperty()
  @IsDate()
  readonly date: Date;

  @ApiProperty()
  @ValidateNested()
  readonly user: User;

  @ApiProperty()
  @ValidateNested()
  @IsArray()
  readonly product: Product[];
}

export class UpdateOrder extends PartialType(CreateOrderDto) {}
