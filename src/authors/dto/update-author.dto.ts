import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAuthorDto {

  @ApiProperty({ example: "J.R.R. Tolkien"})
  @IsString({
    message: 'O título precisa ser em formato texto',
  })
  @MaxLength(150, {
    message: 'Informe um autor até 150 caracteres',
  })
  @IsNotEmpty({
    message: 'Informe um autor do livro',
  })
  name?: string;

  @ApiProperty({
    type: [Number]
  })
  @IsOptional()
  @IsArray()
  bookId?: number[];
}
