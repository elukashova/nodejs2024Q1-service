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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: FavoritesResponse,
    isArray: true,
  })
  getAllFavorites(): FavoritesResponse {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Added successfully',
    schema: {
      properties: {
        message: {
          type: 'string',
          example:
            'the track 3fa85f64-5717-4562-b3fc-2c963f66afa6 was added to favorites',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Track with id doesn't exist",
  })
  createFavoriteTrack(@UUIDParam('id') id: string) {
    this.favoritesService.createFavorite('tracks', id);
    return { message: `the track ${id} was added to favorites` };
  }

  @Post('/album/:id')
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Added successfully',
    schema: {
      properties: {
        message: {
          type: 'string',
          example:
            'the album 3fa85f64-5717-4562-b3fc-2c963f66afa6 was added to favorites',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Album with id doesn't exist",
  })
  createFavoriteAlbum(@UUIDParam('id') id: string) {
    this.favoritesService.createFavorite('albums', id);
    return { message: `the album ${id} was added to favorites` };
  }

  @Post('/artist/:id')
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Added successfully',
    schema: {
      properties: {
        message: {
          type: 'string',
          example:
            'the artist 3fa85f64-5717-4562-b3fc-2c963f66afa6 was added to favorites',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Artist with id doesn't exist",
  })
  createFavoriteArtist(@UUIDParam('id') id: string) {
    this.favoritesService.createFavorite('artists', id);
    return { message: `the artist ${id} was added to favorites` };
  }

  @Delete('/track/:id')
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteTrack(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteFavorite('tracks', id);
  }

  @Delete('/album/:id')
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteAlbum(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteFavorite('albums', id);
  }

  @Delete('/artist/:id')
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavoriteArtist(@UUIDParam('id') id: string) {
    return this.favoritesService.deleteFavorite('artists', id);
  }
}
