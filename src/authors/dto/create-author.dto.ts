import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateBookDto } from 'src/book/dto/create-book.dto';

export class CreateAuthorDTO extends PartialType (CreateBookDto) {
  @ApiProperty({
    description: 'O nome do autor é exibido aqui',
    example: 'J.R.R. Tolkien',
  })
  @IsString({
    message: 'O título precisa ser em formato texto',
  })
  @MaxLength(150, {
    message: 'Informe um autor até 150 caracteres',
  })
  @IsNotEmpty({
    message: 'Informe um autor do livro',
  })
  name: string;
};
