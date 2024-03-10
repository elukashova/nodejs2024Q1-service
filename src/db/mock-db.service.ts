import { UserResponse } from '../api/users/dto/user-response.dto';
import { Artist } from '../api/artists/types/artist.types';
import { Repository } from './mock-repo.service';
import { Track } from '../api/tracks/types/track.types';
import { Album } from '../api/albums/types/album.types';

export const Database = {
  usersRepository: new Repository<UserResponse>(),
  artistsRepository: new Repository<Artist>(),
  tracksRepository: new Repository<Track>(),
  albumsRepository: new Repository<Album>(),
};
