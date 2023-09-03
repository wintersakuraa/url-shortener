import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';

import { redisClient } from '@/redis-client';

import { isValidURL } from '@common/helpers/validation.helpers';
import { appConfig } from '@configs/app.config';
import { UrlDto } from '@models/url/dto/url.dto';
import { Url } from '@models/url/entities/url.entity';
import { InvalidUrlException } from '@models/url/exceptions/invalid-url.exception';
import { UrlType } from '@models/url/url.types';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}

  async shorten(urlDto: UrlDto) {
    const { url: longUrl } = urlDto;

    if (!isValidURL(longUrl)) throw new InvalidUrlException();

    let shortUrl = await this.getUrlFromCache(longUrl, UrlType.LONG);
    if (shortUrl) return shortUrl;

    const urlCode = nanoid();
    shortUrl = `${appConfig.baseUrl}/${urlCode}`;

    await this.urlRepository.save({
      urlCode,
      longUrl,
      shortUrl,
    });

    return shortUrl;
  }

  resolve(urlDto: UrlDto) {
    const { url: shortUrl } = urlDto;

    if (!isValidURL(shortUrl)) throw new InvalidUrlException();

    return this.getUrlFromCache(shortUrl, UrlType.SHORT);
  }

  findOne(urlCode: string): Promise<string> {
    const shortUrl = `${appConfig.baseUrl}/${urlCode}`;
    return this.getUrlFromCache(shortUrl, UrlType.SHORT);
  }

  private async getUrlFromCache(
    url: string,
    urlType: UrlType,
  ): Promise<string> {
    const cachedUrl = await redisClient.get(url);
    if (cachedUrl) return cachedUrl;

    const dbUrl = await this.urlRepository.findOneBy({ [urlType]: url });
    if (!dbUrl) return '';

    const { longUrl, shortUrl } = dbUrl;

    const value = urlType === UrlType.LONG ? shortUrl : longUrl;
    await redisClient.set(url, value, 'EX', appConfig.ttl);

    return value;
  }
}
