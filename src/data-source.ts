import { DataSource } from 'typeorm';

import { dbConfig } from '@configs/db.config';

export const dataSource = new DataSource(dbConfig);
