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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/artist-create.dto';
import { Artist } from './types/artist.types';
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
import { UpdateArtistDto } from './dto/artist-update.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get artist list',
    description: 'Gets all library artist list',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: Artist,
    isArray: true,
  })
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'Successful operation', type: Artist })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  getArtist(@UUIDParam('id') id: string) {
    return this.artistsService.getArtist(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist information',
  })
  @ApiBody({ type: CreateArtistDto })
  @ApiCreatedResponse({ description: 'Artist is created', type: Artist })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @UsePipes(ValidationPipe)
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistsService.createArtist(body);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update library artist information by UUID',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateArtistDto })
  @ApiOkResponse({ description: 'The artist has been updated', type: Artist })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @UsePipes(ValidationPipe)
  updateArtist(@UUIDParam('id') id: string, @Body() body: Artist) {
    return this.artistsService.updateArtist(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Deletes artist from library',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@UUIDParam('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
