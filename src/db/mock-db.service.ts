import { User } from '../types/user.types';
import { Repository } from './mock-repo.service';

export const Database = {
  usersRepository: new Repository<User>(),
  artistsRepository: new Repository(),
  tracksRepository: new Repository(),
  albumsRepository: new Repository(),
};
