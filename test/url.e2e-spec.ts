import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";

import { AppModule } from "@/app.module";

import { GlobalExceptionFilter } from "@common/filters/global-exception.filter";
import { TransformInterceptor } from "@common/interceptors/transform.interceptor";
import { appConfig } from "@configs/app.config";
import { mockUrl, urlService } from "@mocks/url.mock";
import { UrlDto } from "@models/url/dto/url.dto";
import { UrlService } from "@models/url/url.service";

describe('UrlController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UrlService)
      .useValue(urlService)
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe(appConfig.validationPipeOptions));
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));

    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  describe('/shorten (POST)', () => {
    const urlDto: UrlDto = {
      url: mockUrl.longUrl,
    };

    it('should return short url', () => {
      return request(app.getHttpServer())
        .post('/shorten')
        .send(urlDto)
        .expect((response: request.Response) => {
          const { data: shortUrl } = response.body;
          expect(shortUrl).toEqual(mockUrl.shortUrl);
        })
        .expect(HttpStatus.CREATED);
    });
  });

  describe('/resolve (POST)', () => {
    const urlDto: UrlDto = {
      url: mockUrl.shortUrl,
    };

    it('should return long url', () => {
      return request(app.getHttpServer())
        .post('/resolve')
        .send(urlDto)
        .expect((response: request.Response) => {
          const { data: longUrl } = response.body;
          expect(longUrl).toEqual(mockUrl.longUrl);
        })
        .expect(HttpStatus.CREATED);
    });
  });

  describe('/:code (GET)', () => {
    it('should return long url', () => {
      return request(app.getHttpServer())
        .get(`/${mockUrl.urlCode}`)
        .expect(HttpStatus.FOUND);
    });
  });
});
