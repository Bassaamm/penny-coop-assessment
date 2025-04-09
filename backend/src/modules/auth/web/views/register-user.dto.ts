import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

enum Gender {
  Male = 'male',
  Female = 'female',
}

export class RegisterUserDto {
  @ApiProperty({ description: 'User first name', example: 'Abdulaziz' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User last name', example: 'Alsharif' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'User email', example: 'abdulaziz@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User phone', example: '966512345678' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'user gender',
    example: 'male',
  })
  @IsString()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
    minLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
