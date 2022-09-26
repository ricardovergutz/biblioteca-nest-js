import { Request } from 'express'; 
import { employeeEntity } from 'src/person/employee/employee.entity';
import { PersonEntity } from 'src/person/person.entity';

export interface AuthRequest extends Request {
  user: PersonEntity;
}