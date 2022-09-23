import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty()
  @IsString({
    message: 'Informe uma string',
  })
  @MaxLength(150)
  @IsNotEmpty({
    message: 'Informe o nome do livro',
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: 'Informe uma string',
  })
  @IsNotEmpty({
    message: 'Informe o imageUrl do livro',
  })
  image_url: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({
    message: 'informe um Id de genero',
  })
  genreId: number;
}
