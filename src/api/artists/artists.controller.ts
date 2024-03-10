import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/artist-create.dto';
import { Artist } from './types/artist.types';
import { UUIDParam } from '../common/pipes/uuid.pipe';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(200)
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(200)
  getArtist(@UUIDParam('id') id: string) {
    return this.artistsService.getArtist(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistsService.createArtist(body);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(@UUIDParam('id') id: string, @Body() body: Artist) {
    return this.artistsService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@UUIDParam('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
