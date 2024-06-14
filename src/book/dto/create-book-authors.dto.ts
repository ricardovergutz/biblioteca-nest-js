import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateBookAuthorsDTO {
  @ApiProperty({
    type: [Number]
  })
  @IsArray()
  authorsId: number[];
}
