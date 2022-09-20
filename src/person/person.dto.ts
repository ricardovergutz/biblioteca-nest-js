import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString,Matches,MaxLength } from "class-validator";
import { employeeDto } from "./employee/employee.dto";

export class PersonDto{
  @ApiProperty({example: "José Maria de Mattos Netto"})
  @IsString({
    message: 'Apenas letras'
  })
  @IsNotEmpty({
    message: 'Nome obrigatorio'
  })
  @Matches(/([a-z])+$/,{
    message: 'Apenas a primeira leta maiuscula'
  })
  @MaxLength(120)
  name: string

  
  @ApiProperty({example: "exemplo@exemplo.com"})
  @IsString()
  @IsEmail({
    message: 'email invalido'
  })
  @IsNotEmpty()
  email:string

}