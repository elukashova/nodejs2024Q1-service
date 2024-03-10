import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/album-create.dto';
import { Album } from './types/album.types';
import { UUIDParam } from '../../common/pipes/uuid.pipe';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getAlbum(@UUIDParam('id') id: string) {
    return this.albumsService.getAlbum(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Body() body: CreateAlbumDto) {
    return this.albumsService.createAlbum(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateAlbum(@UUIDParam('id') id: string, @Body() body: Album) {
    return this.albumsService.updateAlbum(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@UUIDParam('id') id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}
