import {
  IsString,
  Min,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsPositive,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProduct {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @ApiProperty({ description: 'Stock' })
  @Min(0)
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty({ description: 'Image' })
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

export class UpdateProduct extends PartialType(CreateProduct) {}
