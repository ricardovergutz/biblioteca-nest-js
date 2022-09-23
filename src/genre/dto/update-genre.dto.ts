import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateGenreDto } from './create-genre.dto';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @ApiProperty()
  @IsNotEmpty({
    message: 'name não pode ser vazio',
  })
  @IsString({
    message: 'name precisa ser uma string',
  })
  name: string;
}
