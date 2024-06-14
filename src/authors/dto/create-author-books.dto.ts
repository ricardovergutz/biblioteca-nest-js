import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateAuthorBooksDTO {
  @ApiProperty({
    type: [Number]
  })
  @IsArray()
  booksId: number[];
}
