import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { employeeDto } from "./employee/employee.dto";

export class PersonDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email:string

}