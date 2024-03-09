import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/user-update.dto';
import { UserResponse } from './dto/user-response.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService
      .getAllUsers()
      .map((user) => new UserResponse(user));
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return new UserResponse(this.usersService.getUser(id));
  }
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return new UserResponse(this.usersService.createUser(body));
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    return new UserResponse(this.usersService.updateUser(id, body));
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
