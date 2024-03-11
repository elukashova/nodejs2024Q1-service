import { ApiPropertyOptional } from '@nestjs/swagger';
import { Album } from '../../albums/types/album.types';
import { Artist } from '../../artists/types/artist.types';
import { Track } from '../../tracks/types/track.types';

export interface FavoritesResponseData {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class FavoritesResponse implements FavoritesResponseData {
  @ApiPropertyOptional({ type: Artist, isArray: true })
  artists: Artist[];

  @ApiPropertyOptional({ type: Album, isArray: true })
  albums: Album[];

  @ApiPropertyOptional({ type: Track, isArray: true })
  tracks: Track[];
}
