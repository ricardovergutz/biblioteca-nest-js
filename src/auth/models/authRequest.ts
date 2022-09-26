import { Request } from 'express'; 
import { employeeEntity } from 'src/person/employee/employee.entity';

export interface AuthRequest extends Request {
  user: employeeEntity;
}