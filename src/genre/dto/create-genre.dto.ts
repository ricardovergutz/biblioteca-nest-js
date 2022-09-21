import { IsFQDN, IsNotEmpty, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'name não pode ser vazio',
    })
    @IsFQDN()
    @IsString({
        message: 'name precisa ser uma string',
    })
    @Matches(/^([A-Z]{1})([a-z]{1,})+$/,{
        message: 'Apenas a primeira leta maiuscula'
      })
    name: string;
}