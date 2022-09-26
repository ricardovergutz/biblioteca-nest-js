import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PersonEntity } from 'src/person/person.entity';
import { AuthRequest } from '../models/authRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): PersonEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);