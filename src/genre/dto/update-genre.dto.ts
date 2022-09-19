import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateGenreDto } from './create-genre.dto';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}
