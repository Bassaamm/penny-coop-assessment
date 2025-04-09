import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordParamsDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  token: string;
}

export class ResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class ResetPasswordRequestDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
