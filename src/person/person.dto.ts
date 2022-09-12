import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { employeeDto } from "./employee/employee.dto";

export class PersonDto { 
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email:string

}