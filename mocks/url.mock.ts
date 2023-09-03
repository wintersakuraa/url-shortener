import { randomUUID } from 'crypto';

import { appConfig } from '@configs/app.config';

export const mockUrl = {
  id: randomUUID(),
  longUrl: 'https://long.url/123456789',
  shortUrl: `${appConfig.baseUrl}/code`,
  urlCode: 'code',
};

export const mockUrlRepository = {
  findOneBy: jest.fn().mockResolvedValue(mockUrl),
  save: jest.fn(),
};

export const urlService = {
  shorten: jest.fn().mockResolvedValue(mockUrl.shortUrl),
  resolve: jest.fn().mockResolvedValue(mockUrl.longUrl),
  findOne: jest.fn().mockResolvedValue(mockUrl.longUrl),
};
