import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDTO {
  @ApiProperty({
    description: 'O nome do autor é exibido aqui',
    example: 'J.R.R. Tolkien',
    type: "string",
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
}
