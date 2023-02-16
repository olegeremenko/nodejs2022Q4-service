import { Module } from '@nestjs/common';
import { AlbumsRepository } from '../albums/albums.repository';
import { ArtistsRepository } from '../artists/artists.repository';
import { TracksRepository } from '../tracks/tracks.repository';
import { FavoritesService } from '../favorites/favorites.service';
import { FavoritesRepository } from '../favorites/favorites.repository';
// import { UsersRepository } from '../users/users.repository';

@Module({
  providers: [
    FavoritesService,
    FavoritesRepository,
    AlbumsRepository,
    ArtistsRepository,
    TracksRepository,
    // UsersRepository,
  ],
  exports: [
    FavoritesService,
    FavoritesRepository,
    AlbumsRepository,
    ArtistsRepository,
    TracksRepository,
    // UsersRepository,
  ],
})
export class DbModule {}
