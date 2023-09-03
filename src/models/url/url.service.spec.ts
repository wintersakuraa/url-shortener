import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { redisClient } from '@/redis-client';

import { mockUrl, mockUrlRepository } from '@mocks/url.mock';
import { UrlDto } from '@models/url/dto/url.dto';
import { Url } from '@models/url/entities/url.entity';
import { InvalidUrlException } from '@models/url/exceptions/invalid-url.exception';

import { UrlService } from './url.service';

jest.mock('@/redis-client');

jest.mock('nanoid', () => {
  return { nanoid: () => mockUrl.urlCode };
});

describe('UrlService', () => {
  let service: UrlService;
  let repository: Repository<Url>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: getRepositoryToken(Url),
          useValue: mockUrlRepository,
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
    repository = module.get<Repository<Url>>(getRepositoryToken(Url));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('shorten', () => {
    describe('when URL is valid', () => {
      const urlDto: UrlDto = { url: mockUrl.longUrl };

      describe('and exists in cache', () => {
        beforeEach(() => {
          jest.spyOn(redisClient, 'get').mockResolvedValue(mockUrl.shortUrl);
        });

        it('should return short URL from cache', async () => {
          const result = await service.shorten(urlDto);

          expect(result).toEqual(mockUrl.shortUrl);
        });
      });

      describe('and exists in db', () => {
        beforeEach(() => {
          jest.spyOn(redisClient, 'get').mockResolvedValue(null);
          jest.spyOn(redisClient, 'set').mockImplementation();
        });

        it('should return short URL from db', async () => {
          const result = await service.shorten(urlDto);
          const spyOnFindOneBy = jest.spyOn(repository, 'findOneBy');

          expect(result).toEqual(mockUrl.shortUrl);
          expect(spyOnFindOneBy).toHaveBeenCalledWith({
            longUrl: mockUrl.longUrl,
          });
        });
      });

      describe('and not exists', () => {
        beforeEach(() => {
          jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
          jest.spyOn(redisClient, 'get').mockResolvedValue(null);
        });

        it('should return short URL from db', async () => {
          const result = await service.shorten(urlDto);
          const spyOnSave = jest.spyOn(repository, 'save');

          expect(result).toEqual(mockUrl.shortUrl);
          expect(spyOnSave).toHaveBeenCalled();
        });
      });
    });

    describe('when URL is not valid', () => {
      const urlDto: UrlDto = { url: 'invalid url' };

      it('should throw InvalidUrlException', async () => {
        await expect(service.shorten(urlDto)).rejects.toThrow(
          InvalidUrlException,
        );
      });
    });
  });
});
