import { Exclude } from 'class-transformer';
import { User } from '../types/user.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponse implements User {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'TestUser' })
  login: string;

  @Exclude()
  password: string;

  @ApiPropertyOptional({ example: 1 })
  version: number;

  @ApiPropertyOptional({ example: 1655000000 })
  createdAt: number;

  @ApiPropertyOptional({ example: 1655000000 })
  updatedAt: number;

  constructor(props: Partial<UserResponse>) {
    Object.assign(this, props);
  }
}
