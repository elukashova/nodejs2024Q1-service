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
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/artist-create.dto';
import { Artist } from './types/artist.types';

@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(200)
  getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(200)
  getArtist(@Param('id') id: string) {
    return this.artistsService.getArtist(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() body: CreateArtistDto) {
    return this.artistsService.createArtist(body);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(@Param('id') id: string, @Body() body: Artist) {
    return this.artistsService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
