import {IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { PersonDto } from "../person.dto"
import { ApiProperty } from "@nestjs/swagger";
export class employeeDto extends PersonDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: 'password too weak',
    })
    password: string
}