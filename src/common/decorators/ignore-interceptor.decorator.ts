import { SetMetadata } from '@nestjs/common';

export const IgnoreInterceptor = () => SetMetadata('ignoreInterceptor', true);
