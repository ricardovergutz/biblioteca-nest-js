import {IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { PersonDto } from "../person.dto"
import { ApiProperty, PartialType } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';
export class employeeDto extends PartialType(PersonDto) {

    @ApiProperty({example: "Doidera@456", description: "A senha sera usada para login do funcionario, sera de no minimo 4 caracteres até 20 caracteres. Não pode ser nula e precisa ter no minimo 1 caractere especial, 1 letra maiuscula e numeros."})
    @IsString({
        message: 'Apenas letras'
    })
    @IsNotEmpty({
        message: 'Nome obrigatorio'
    })
    @MinLength(4,{
        message: 'A senha deve ter no minimo 4 caracteres!'
    })
    @MaxLength(20,{
        message: 'A senha deve ter no maximo 20 caracteres!'
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo!',
    })
    password: string
    
    /* async checkPassword(password: string):Promise<boolean>{
        const hash = await bcrypt.hash(password, 10)
        return hash === this.password 
    }*/
}