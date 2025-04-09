import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignInDto {
  @ApiPropertyOptional()
  @IsOptional()
  clubDomain?: string;

  @ApiProperty({ description: 'User email', example: 'abdulaziz@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
    minLength: 8,
  })
  @IsNotEmpty()
  password: string;
}
