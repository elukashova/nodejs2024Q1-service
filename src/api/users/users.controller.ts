import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/user-update.dto';
import { UserResponse } from './dto/user-response.dto';
import { UUIDParam } from '../common/pipes/uuid.pipe';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  getAllUsers() {
    return this.usersService
      .getAllUsers()
      .map((user) => new UserResponse(user));
  }

  @Get(':id')
  @HttpCode(200)
  getUser(@UUIDParam('id') id: string) {
    return new UserResponse(this.usersService.getUser(id));
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() body: CreateUserDto) {
    return new UserResponse(this.usersService.createUser(body));
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(@UUIDParam('id') id: string, @Body() body: UpdatePasswordDto) {
    return new UserResponse(this.usersService.updateUser(id, body));
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@UUIDParam('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
