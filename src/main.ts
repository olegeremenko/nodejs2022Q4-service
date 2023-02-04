import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const port: number = +(process.env['PORT'] || 4000);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
