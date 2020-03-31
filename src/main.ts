import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'utils/http-exception.filter';
import { ErrorFilter } from 'utils/error.filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from 'nest-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggerService));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
