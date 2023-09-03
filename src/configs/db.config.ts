import './env.config';

import { DataSourceOptions } from 'typeorm';

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/models/**/entities/**/*{.js,.ts}'],
  migrations: ['dist/database/migrations/**/*{.js,.ts}'],
  synchronize: false,
};
