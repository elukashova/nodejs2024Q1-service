import { UserResponse } from '../users/dto/user-response.dto';
import { Repository } from './mock-repo.service';

export const Database = {
  usersRepository: new Repository<UserResponse>(),
  artistsRepository: new Repository(),
  tracksRepository: new Repository(),
  albumsRepository: new Repository(),
};
