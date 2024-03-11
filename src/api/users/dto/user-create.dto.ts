import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

interface CreateUserData {
  login: string;
  password: string;
}

export class CreateUserDto implements CreateUserData {
  @ApiProperty({ description: "The user's login" })
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login is required' })
  public login: string;

  @ApiProperty({ description: "The user's password" })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  public password: string;
}
