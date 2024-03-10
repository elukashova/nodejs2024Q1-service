import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUIDParam } from '../../common/pipes/uuid.pipe';
import { FavoritesResponse } from './dto/favorites-response.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllFavorites(): FavoritesResponse {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  createFavoriteTrack(@UUIDParam('id') id: string) {
    return this.favoritesService.createFavorite('tracks', id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  createFavoriteAlbum(@UUIDParam('id') id: string) {
    return this.favoritesService.createFavorite('albums', id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  createFavoriteArtist(@UUIDParam('id') id: string) {
    return this.favoritesService.createFavorite('artists', id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteTrack(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteFavorite('tracks', id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteAlbum(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteFavorite('albums', id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteArtist(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteFavorite('artists', id);
  }
}
