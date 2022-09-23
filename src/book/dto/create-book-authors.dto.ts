import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateBookAuthorsDTO {
  @IsArray()
  authorsId: number[];
}
