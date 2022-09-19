import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { PersonDto } from './person.dto';

export class UpdatePersonDTO  {

    @IsString()
    password: string
}
