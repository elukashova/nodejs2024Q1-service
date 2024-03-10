import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/user-update.dto';
import { Database } from '../../db/mock-db.service';
import { v4 } from 'uuid';
import { UserResponse } from './dto/user-response.dto';

const { usersRepository } = Database;

@Injectable()
export class UsersService {
  createUser(data: CreateUserDto): UserResponse {
    if (!data.login || !data.password) {
      throw new BadRequestException('Login and password are required');
    }

    const { login, password } = data;

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
    const user = usersRepository.getOneById({ id });
    if (!user) {
      throw new NotFoundException("User with such id doesn't exist");
    }

    return user;
  }

  updateUser(id: string, data: UpdatePasswordDto) {
    const user = this.getUser(id);

    if (user.password !== data.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }

    const version = user.version + 1;

    return usersRepository.add({
      ...user,
      password: data.newPassword,
      version,
      updatedAt: Date.now(),
    });
  }

  deleteUser(id: string) {
    const user = this.getUser(id);
    return usersRepository.delete(user);
  }
}
