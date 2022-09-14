import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { employeeDto } from "./employee/employee.dto";

export class PersonDto {
  @ApiProperty({example: "José Maria de Mattos Netto"})
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string

  @ApiProperty({example: "exemplo@exemplo.com"})
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email:string

}