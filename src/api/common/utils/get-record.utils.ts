import { Database } from '../../../db/mock-db.service';
import { Album } from '../../albums/types/album.types';
import { Artist } from '../../artists/types/artist.types';
import { Track } from '../../tracks/types/track.types';

export const getRecord = (key: string, id: string): Track | Album | Artist => {
  return Database[`${key}Repository`].getOneById({ id });
};
