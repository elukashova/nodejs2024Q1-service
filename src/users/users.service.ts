import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/user-update.dto';

interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

@Injectable()
export class UsersService {
  createUser(data: CreateUserDto) {
    return;
  }

  getAllUsers() {
    return;
  }

  getUser(id: string) {
    return;
  }

  updateUser(id: string, data: UpdatePasswordDto) {
    return;
  }

  deleteUser(id: string) {
    return;
  }
}
