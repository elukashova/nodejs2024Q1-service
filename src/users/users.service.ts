import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/user-update.dto';

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
