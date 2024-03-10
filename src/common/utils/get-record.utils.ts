import { Database } from '../../db/mock-db.service';
import { Album } from '../../api/albums/types/album.types';
import { Artist } from '../../api/artists/types/artist.types';
import { Track } from '../../api/tracks/types/track.types';

export const getRecord = (key: string, id: string): Track | Album | Artist => {
  return Database[`${key}Repository`].getOneById({ id });
};
