import {IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { PersonDto } from "../person.dto"

export class employeeDto extends PersonDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: 'password too weak',
    })
    password: string
}