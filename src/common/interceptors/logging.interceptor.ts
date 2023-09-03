import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Start Request');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`Request Finished: ${Date.now() - now}ms`)));
  }
}
