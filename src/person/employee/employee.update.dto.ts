import { PartialType } from '@nestjs/mapped-types';
import { employeeDto } from './employee.dto';

export class UpdateEmployeeDTO extends PartialType(employeeDto) {}