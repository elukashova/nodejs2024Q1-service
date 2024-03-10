import { UserResponse } from '../api/users/dto/user-response.dto';
import { Artist } from '../api/artists/types/artist.types';
import { Repository } from './mock-repo.service';

export const Database = {
  usersRepository: new Repository<UserResponse>(),
  artistsRepository: new Repository<Artist>(),
  tracksRepository: new Repository(),
  albumsRepository: new Repository(),
};
