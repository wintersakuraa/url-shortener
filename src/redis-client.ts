import Redis from 'ioredis';

import { redisConfig } from '@configs/redis.config';

export const redisClient = new Redis(redisConfig);
