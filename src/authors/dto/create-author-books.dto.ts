import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateAuthorBooksDTO {
  @IsArray()
  booksId: number[];

  @IsArray()
  authorsId: number[];
}
