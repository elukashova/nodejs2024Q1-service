import { getRecord } from '../common/utils/get-record.utils';
import { FavoritesResponse } from '../api/favorites/dto/favorites-response.dto';
import { Favorites } from '../api/favorites/types/favorite.types';

export class FavoritesRepository {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll() {
    const favorites: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    Object.entries(this.favorites).forEach(([type, ids]) => {
      favorites[type] = ids.map((id: string) => getRecord(type, id));
    });

    return favorites;
  }

  add(key: keyof Favorites, id: string): string {
    this.favorites[key].push(id);
    return id;
  }

  delete(key: keyof Favorites, id: string): string {
    this.favorites[key] = this.favorites[key].filter(
      (favorite: string) => id !== favorite,
    );

    return id;
  }
}
