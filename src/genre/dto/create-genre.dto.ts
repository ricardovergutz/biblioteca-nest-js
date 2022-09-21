import { IsFQDN, IsNotEmpty, IsString } from "class-validator";
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
    name: string;
}