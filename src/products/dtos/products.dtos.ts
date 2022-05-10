import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
  IsMongoId,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './category.dtos';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly category: string[];

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FiltrarProduct {
  // Paginación

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;

  // Price

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice: number;

  @ValidateIf((param) => param.minPrice)
  @IsPositive()
  maxPrice: number;

  @IsPositive()
  @IsOptional()
  eqPrice: number;

  // Stock

  @IsOptional()
  @IsNumber()
  @Min(0)
  minStock: number;

  @ValidateIf((param) => param.minStock)
  @IsPositive()
  maxStock: number;

  @IsPositive()
  @IsOptional()
  eqStock: number;

  // Brand

  @IsMongoId()
  @IsOptional()
  eqBrand: string;

  // Category

  @IsMongoId()
  @IsOptional()
  eqCategory: string;

  // Name

  @IsString()
  @IsOptional()
  eqName: string;
}
