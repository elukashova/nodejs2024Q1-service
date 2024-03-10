import { Controller, Delete, Get, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUIDParam } from '../common/pipes/uuid.pipe';
import { FavoritesResponse } from './dto/favorites-response.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites(): FavoritesResponse {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  createFavoriteTrack(@UUIDParam('id') id: string) {
    return this.favoritesService.createFavorite('tracks', id);
  }

  @Post('/album/:id')
  createFavoriteAlbum(@UUIDParam('id') id: string) {
    return this.favoritesService.createFavorite('albums', id);
  }

  @Post('/artist/:id')
  createFavoriteArtist(@UUIDParam('id') id: string) {
    return this.favoritesService.createFavorite('artists', id);
  }

  @Delete('/track/:id')
  deleteFavoriteTrack(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteFavorite('tracks', id);
  }

  @Delete('/album/:id')
  deleteFavoriteAlbum(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteFavorite('albums', id);
  }

  @Delete('/artist/:id')
  deleteFavoriteArtist(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteFavorite('artists', id);
  }
}
