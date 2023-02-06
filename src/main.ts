import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';

async function bootstrap() {
  dotenv.config();
  const port: number = +(process.env['PORT'] || 4000);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Home Library')
    .setDescription(
      'Home music library service that stores Artists/Albums/Tracks',
    )
    .setVersion('0.0.1')
    .build();

  const options: SwaggerDocumentOptions = {
    include: [
      UsersModule,
      ArtistsModule,
      AlbumsModule,
      TracksModule,
      FavoritesModule,
    ],
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
