import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { employeeDto } from 'src/person/employee/employee.dto';
import { employeeEntity } from 'src/person/employee/employee.entity';
import { PersonEntity } from 'src/person/person.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email'});
  }

  validate(email: string, password: string){

    return this.authService.validateUser(email, password);
  }
}