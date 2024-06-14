import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ example: "Learning React"})
  @IsString({
    message: 'Informe uma string',
  })
  @MaxLength(150)
  @IsNotEmpty({
    message: 'Informe o nome do livro',
  })
  name: string;

  @ApiProperty({ example: "https://m.media-amazon.com/images/I/91+j1w9Vk7L._AC_UF1000,1000_QL80_.jpg"})
  @IsString({
    message: 'Informe uma string',
  })
  @IsNotEmpty({
    message: 'Informe o url do livro',
  })
  image_url: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty({
    message: 'informe um Id de genero',
  })
  genreId: number;

  @ApiProperty({
    type: [Number],
    example: [ 1 ]
  })
  @IsOptional()
  @IsArray()
  authorsId?: number[];
}
