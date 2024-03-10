import { Injectable } from '@nestjs/common';
import { Database } from '../../db/mock-db.service';
import { Favorites } from './types/favorite.types';
import { getRecord } from '../common/utils/get-record.utils';

const { favoritesRepository } = Database;

@Injectable()
export class FavoritesService {
  createFavorite(key: keyof Favorites, id: string) {
    if (!getRecord(key, id)) {
      return null;
    }

    return favoritesRepository.add(key, id);
  }

  getAllFavorites() {
    return favoritesRepository.getAll();
  }

  deleteFavorite(key: keyof Favorites, id: string) {
    if (!getRecord(key, id)) {
      return null;
    }

    return favoritesRepository.delete(key, id);
  }
}
