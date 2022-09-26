import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateBookAuthorsDTO {
  @ApiProperty()
  @IsArray()
  authorsId: number[];
}
