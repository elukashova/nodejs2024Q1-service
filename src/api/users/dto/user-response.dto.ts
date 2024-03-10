import { Exclude } from 'class-transformer';
import { User } from '../types/user.types';

export class UserResponse implements User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(props: Partial<UserResponse>) {
    Object.assign(this, props);
  }
}
