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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/artist-create.dto';
import { Artist } from './types/artist.types';
import { UUIDParam } from '../../common/pipes/uuid.pipe';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getArtist(@UUIDParam('id') id: string) {
    return this.artistsService.getArtist(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistsService.createArtist(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateArtist(@UUIDParam('id') id: string, @Body() body: Artist) {
    return this.artistsService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@UUIDParam('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
