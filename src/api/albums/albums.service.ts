import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/album-create.dto';
import { Database } from '../../db/mock-db.service';
import { UpdateAlbumDto } from './dto/album-update.dto';
import { deleteRecord } from '../common/utils/delete-record.utils';

const { albumsRepository, tracksRepository } = Database;

@Injectable()
export class AlbumsService {
  createAlbum(data: CreateAlbumDto) {
    const track = { ...data, id: v4() };

    return albumsRepository.add(track);
  }

  getAllAlbums() {
    return albumsRepository.getAll();
  }

  getAlbum(id: string) {
    return albumsRepository.getOneById({ id });
  }

  updateAlbum(id: string, data: UpdateAlbumDto) {
    const track = albumsRepository.getOneById({ id });
    return albumsRepository.add({ ...track, ...data });
  }

  deleteAlbum(id: string) {
    const album = albumsRepository.getOneById({ id });
    deleteRecord(tracksRepository, 'albumId', id);

    return albumsRepository.delete(album);
  }
}
