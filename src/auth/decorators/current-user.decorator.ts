import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { employeeEntity } from 'src/person/employee/employee.entity';
import { AuthRequest } from '../models/authRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): employeeEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);