import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/user-update.dto';
import { Database } from '../db/mock-db.service';
import { v4 } from 'uuid';
import { User } from '../types/user.types';

const { usersRepository } = Database;

@Injectable()
export class UsersService {
  createUser({ login, password }: CreateUserDto): User {
    const user = {
      id: v4(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return usersRepository.add(user);
  }

  getAllUsers() {
    return usersRepository.getAll();
  }

  getUser(id: string) {
    return usersRepository.getOneById({ id });
  }

  updateUser(id: string, data: UpdatePasswordDto) {
    const user = usersRepository.getOneById({ id });
    console.log(user);
    const version = user.version + 1;
    return usersRepository.add({
      ...user,
      password: data.newPassword,
      version,
      updatedAt: Date.now(),
    });
  }

  deleteUser(id: string) {
    return usersRepository.delete({ id });
  }
}
