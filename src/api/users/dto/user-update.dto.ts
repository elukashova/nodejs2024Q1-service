import { IsString } from 'class-validator';

interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export class UpdatePasswordDto implements UpdatePasswordData {
  @IsString()
  public oldPassword: string;

  @IsString()
  public newPassword: string;
}
