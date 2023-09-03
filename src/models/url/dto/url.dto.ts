import { IsString, IsNotEmpty } from 'class-validator';

export class UrlDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
