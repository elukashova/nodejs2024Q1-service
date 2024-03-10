import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/track-update.dto';
import { Database } from '../../db/mock-db.service';
import { Track } from './types/track.types';

const { tracksRepository } = Database;

@Injectable()
export class TracksService {
  createTrack(data: CreateTrackDto) {
    const track = { ...data, id: v4() };

    return tracksRepository.add(track);
  }

  getAllTracks() {
    return tracksRepository.getAll();
  }

  getTrack(id: string) {
    return tracksRepository.getOneById({ id });
  }

  updateTrack(id: string, data: Partial<Track>) {
    const track = tracksRepository.getOneById({ id });
    return tracksRepository.add({ ...track, ...data });
  }

  deleteTrack(id: string) {
    return tracksRepository.delete({ id });
  }
}
