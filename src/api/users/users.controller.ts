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
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/user-update.dto';
import { UserResponse } from './dto/user-response.dto';
import { UUIDParam } from '../../common/pipes/uuid.pipe';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Gets all users' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: UserResponse,
    isArray: true,
  })
  getAllUsers() {
    return this.usersService
      .getAllUsers()
      .map((user) => new UserResponse(user));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Successful operation', type: UserResponse })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  getUser(@UUIDParam('id') id: string) {
    return new UserResponse(this.usersService.getUser(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'The user has been created',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @UsePipes(ValidationPipe)
  createUser(@Body() body: CreateUserDto) {
    return new UserResponse(this.usersService.createUser(body));
  }

  @Put(':id')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiOkResponse({
    description: 'The user has been updated',
    schema: {
      title: 'User',
      properties: {
        id: { type: 'string', format: 'uuid' },
        login: { type: 'string', example: 'TestUser' },
        version: { type: 'integer', example: 2 },
        createdAt: { type: 'integer', example: 1655000000 },
        updatedAt: { type: 'integer', example: 1655999999 },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UsePipes(ValidationPipe)
  updateUser(@UUIDParam('id') id: string, @Body() body: UpdatePasswordDto) {
    return new UserResponse(this.usersService.updateUser(id, body));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user', description: 'Deletes user by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@UUIDParam('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
