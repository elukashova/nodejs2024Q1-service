import { IsNotEmpty, IsString } from 'class-validator';

interface CreateUserData {
  login: string;
  password: string;
}

export class CreateUserDto implements CreateUserData {
  @IsString()
  @IsNotEmpty()
  public login: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
