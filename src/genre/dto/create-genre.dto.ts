import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}