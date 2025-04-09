import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ description: 'User first name', example: 'Bassam' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User last name', example: 'AlQarni' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'User email', example: 'Bassamalqrni@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
    minLength: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
