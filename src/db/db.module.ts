import { Module } from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Module({
  providers: [
    FavoritesService,
    FavoritesRepository,
  ],
  exports: [
    FavoritesService,
    FavoritesRepository,
  ],
})
export class DbModule {}
