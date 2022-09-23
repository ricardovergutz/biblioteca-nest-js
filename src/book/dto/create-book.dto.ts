import { IsArray, IsEmpty, IsFQDN, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto{
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
    message: 'Informe o url do livro',
  })
  @IsFQDN({
    message: 'Informe uma url válida',
  })
  url: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({
    message: 'informe um Id de genero',
  })
  genreId: number;

  @IsOptional()
  @IsArray()
  authorsId?: number[]
}
