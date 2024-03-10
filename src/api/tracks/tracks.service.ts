import { v4 } from 'uuid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/track-update.dto';
import { Database } from '../../db/mock-db.service';
import { UpdateTrackDto } from './dto/track-create.dto';

const { tracksRepository } = Database;

@Injectable()
export class TracksService {
  createTrack(data: CreateTrackDto) {
    if (!data.name || !data.duration) {
      throw new BadRequestException('Name and duration are required');
    }

    const track = { ...data, id: v4() };

    return tracksRepository.add(track);
  }

  getAllTracks() {
    return tracksRepository.getAll();
  }

  getTrack(id: string) {
    const track = tracksRepository.getOneById({ id });
    if (!track) {
      throw new NotFoundException("Track with such id doesn't exist");
    }

    return track;
  }

  updateTrack(id: string, data: UpdateTrackDto) {
    const track = this.getTrack(id);
    return tracksRepository.add({ ...track, ...data });
  }

  deleteTrack(id: string) {
    const track = this.getTrack(id);
    return tracksRepository.delete(track);
  }
}
