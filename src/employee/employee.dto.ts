import { IsNotEmpty, IsString } from "class-validator"


export class employeeDto {
    @IsString()
    @IsNotEmpty()
    name: string

    
    password: string
}