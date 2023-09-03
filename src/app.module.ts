import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { dbConfig } from '@configs/db.config';
import { loggerConfig } from '@configs/logger.config';
import { UrlModule } from '@models/url/url.module';

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    TypeOrmModule.forRoot(dbConfig),
    UrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
