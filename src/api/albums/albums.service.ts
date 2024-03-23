import { v4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/album-create.dto';
import { Database } from '../../db/mock-db.service';
import { UpdateAlbumDto } from './dto/album-update.dto';
import { deleteRecord } from '../../common/utils/delete-record.utils';

const { albumsRepository, tracksRepository } = Database;

@Injectable()
export class AlbumsService {
  createAlbum(data: CreateAlbumDto) {
    const album = { ...data, id: v4() };

    return albumsRepository.add(album);
  }

  getAllAlbums() {
    return albumsRepository.getAll();
  }

  getAlbum(id: string) {
    const album = albumsRepository.getOneById({ id });
    if (!album) {
      throw new NotFoundException("Album with such id doesn't exist");
    }

    return album;
  }

  updateAlbum(id: string, data: UpdateAlbumDto) {
    const track = this.getAlbum(id);
    return albumsRepository.add({ ...track, ...data });
  }

  deleteAlbum(id: string) {
    const album = this.getAlbum(id);

    deleteRecord(tracksRepository, 'albumId', id);

    return albumsRepository.delete(album);
  }
}
