import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';

import { IgnoreInterceptor } from '@common/decorators/ignore-interceptor.decorator';

import { UrlDto } from './dto/url.dto';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/shorten')
  shorten(@Body() urlDto: UrlDto) {
    return this.urlService.shorten(urlDto);
  }

  @Post('/resolve')
  resolve(@Body() urlDto: UrlDto) {
    return this.urlService.resolve(urlDto);
  }

  @IgnoreInterceptor()
  @Get('/:urlCode')
  @Redirect()
  async redirect(@Param('urlCode') urlCode: string) {
    const url = await this.urlService.findOne(urlCode);
    return { url };
  }
}
