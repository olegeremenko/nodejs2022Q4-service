import {Module} from '@nestjs/common';
import {AlbumsService} from './albums.service';
import {AlbumsController} from './albums.controller';
import {AlbumRepository} from "./album.repository";

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumRepository]
})
export class AlbumsModule {}
