import { Album } from '../../albums/types/album.types';
import { Artist } from '../../artists/types/artist.types';
import { Track } from '../../tracks/types/track.types';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
