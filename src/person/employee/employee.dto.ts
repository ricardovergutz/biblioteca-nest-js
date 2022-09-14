import {IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { PersonDto } from "../person.dto"
import { ApiProperty, PartialType } from "@nestjs/swagger";
export class employeeDto extends PartialType(PersonDto) {

    @ApiProperty({example: "Doidera@456", description: "A senha sera usada para login do funcionario, sera de no minimo 4 caracteres até 20 caracteres. Não pode ser nula e precisa ter no minimo 1 caractere especial, 1 letra maiuscula e numeros."})
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: 'password too weak',
    })
    password: string
}