import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from '../../db/mock-db.service';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/artist-create.dto';
import { Artist } from './types/artist.types';
import { deleteRecord } from '../../common/utils/delete-record.utils';

const { artistsRepository, tracksRepository, albumsRepository } = Database;

@Injectable()
export class ArtistsService {
  createArtist(data: CreateArtistDto): Artist {
    if (!data.name || !data.grammy) {
      throw new BadRequestException('Name and grammy are required');
    }

    const artist = { ...data, id: v4() };

    return artistsRepository.add(artist);
  }

  getAllArtists() {
    return artistsRepository.getAll();
  }

  getArtist(id: string) {
    const artist = artistsRepository.getOneById({ id });
    if (!artist) {
      throw new NotFoundException("Artist with such id doesn't exist");
    }

    return artist;
  }

  updateArtist(id: string, data: Partial<Artist>) {
    const artist = this.getArtist(id);

    return artistsRepository.add({ ...artist, ...data });
  }

  deleteArtist(id: string) {
    const artist = this.getArtist(id);

    deleteRecord(tracksRepository, 'artistId', id);
    deleteRecord(albumsRepository, 'artistId', id);

    return artistsRepository.delete(artist);
  }
}
