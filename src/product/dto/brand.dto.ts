import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBrand {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly image: string;
}

export class UpdateBrand extends PartialType(CreateBrand) {}
