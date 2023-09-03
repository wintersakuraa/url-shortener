import { BadRequestException } from '@nestjs/common';

export class InvalidUrlException extends BadRequestException {
  constructor() {
    super({
      statusCode: 400,
      message: 'Invalid URL',
      error: 'Bad Request',
    });
  }
}
