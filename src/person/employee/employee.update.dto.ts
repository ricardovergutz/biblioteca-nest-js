import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { employeeDto } from './employee.dto';

export class UpdateEmployeeDTO extends PartialType(employeeDto) {}
