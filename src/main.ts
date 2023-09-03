import '@configs/env.config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { GlobalExceptionFilter } from '@common/filters/global-exception.filter';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { appConfig } from '@configs/app.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe(appConfig.validationPipeOptions));
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));

  await app.listen(appConfig.port);
}

bootstrap();
