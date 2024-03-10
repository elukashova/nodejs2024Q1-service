import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from '../../db/mock-db.service';
import { Favorites } from './types/favorite.types';
import { getRecord } from '../../common/utils/get-record.utils';

const { favoritesRepository } = Database;

@Injectable()
export class FavoritesService {
  createFavorite(key: keyof Favorites, id: string) {
    this.checkRecord(key, id);

    return favoritesRepository.add(key, id);
  }

  getAllFavorites() {
    return favoritesRepository.getAll();
  }

  deleteFavorite(key: keyof Favorites, id: string) {
    this.checkRecord(key, id);

    return favoritesRepository.delete(key, id);
  }

  checkRecord(key: keyof Favorites, id: string) {
    if (!getRecord(key, id)) {
      const entityName = key.charAt(0).toUpperCase() + key.slice(1, -1);
      throw new NotFoundException(`${entityName} with such id doesn't exist`);
    }
  }
}
