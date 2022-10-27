import { IsString, MinLength, MaxLength, IsEmail, IsDate, Matches } from 'class-validator';

export class UsersDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;

  @IsString()
  @MinLength(9)
  @MaxLength(11)
  phone: string;

  @IsString()
  role: string;

  @IsString()
  avatar: string;

  @IsDate()
  alarm: Date;
}
