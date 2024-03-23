import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/album-create.dto';
import { Album } from './types/album.types';
import { UUIDParam } from '../../common/pipes/uuid.pipe';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateAlbumDto } from './dto/album-update.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get album list',
    description: 'Gets all library album list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Album,
    isArray: true,
  })
  getAllAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single album by id',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Successful operation', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  getAlbum(@UUIDParam('id') id: string) {
    return this.albumsService.getAlbum(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiBody({ type: CreateAlbumDto })
  @ApiCreatedResponse({ description: 'Album is created', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @UsePipes(ValidationPipe)
  createAlbum(@Body() body: CreateAlbumDto) {
    return this.albumsService.createAlbum(body);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiOkResponse({ description: 'The album has been updated', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @UsePipes(ValidationPipe)
  updateAlbum(@UUIDParam('id') id: string, @Body() body: Album) {
    return this.albumsService.updateAlbum(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Deletes album from library',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@UUIDParam('id') id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}
