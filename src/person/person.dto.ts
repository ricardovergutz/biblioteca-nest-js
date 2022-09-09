import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class PersonDto{
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email:string
}