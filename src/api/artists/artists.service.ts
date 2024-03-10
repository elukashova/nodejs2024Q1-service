import { Injectable } from '@nestjs/common';
import { Database } from '../../db/mock-db.service';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/artist-create.dto';
import { Artist } from './types/artist.types';
import { deleteRecord } from '../common/utils/delete-record.utils';

const { artistsRepository, tracksRepository, albumsRepository } = Database;

@Injectable()
export class ArtistsService {
  createArtist(data: CreateArtistDto): Artist {
    const artist = { ...data, id: v4() };
    return artistsRepository.add(artist);
  }

  getAllArtists() {
    return artistsRepository.getAll();
  }

  getArtist(id: string) {
    return artistsRepository.getOneById({ id });
  }

  updateArtist(id: string, data: Partial<Artist>) {
    const artist = artistsRepository.getOneById({ id });
    return artistsRepository.add({ ...artist, ...data });
  }

  deleteArtist(id: string) {
    const artist = artistsRepository.getOneById({ id });
    deleteRecord(tracksRepository, 'artistId', id);
    deleteRecord(albumsRepository, 'artistId', id);

    return artistsRepository.delete(artist);
  }
}
