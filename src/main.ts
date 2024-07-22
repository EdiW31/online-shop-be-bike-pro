import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express'; // Add this line to import the 'express' module

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  app.use(cookieParser());
  app.use('/uploads', express.static('uploads'));

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  }); // enable cors

  await app.listen(8000);
}
bootstrap();
