import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  NotEquals,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/model/role.model';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsString()
  @NotEquals(Role.ADMIN)
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FindEmail {
  @IsString()
  @IsEmail()
  readonly email: string;
}
