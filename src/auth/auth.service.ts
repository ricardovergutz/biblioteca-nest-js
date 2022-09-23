import { ForbiddenException, Injectable } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import * as bcrypt from 'bcrypt'
import { EmployeeService } from 'src/person/employee/employ.service';
import { employeeEntity } from 'src/person/employee/employee.entity';
import { employeeDto } from 'src/person/employee/employee.dto';
import { PersonEntity } from 'src/person/person.entity';



import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
    
    constructor(private readonly personService: PersonService,
                private readonly jwtService: JwtService
        ){}
    login(user: PersonEntity): UserToken {
         const payload: UserPayload  = {
            sub: user.id,
            email: user.email,
         }

         const jwtToken = this.jwtService.sign(payload)
         return{
            access_token: jwtToken
         }
    }
    async validateUser(email: string, password: string){
        try{
            const employee = await this.personService.findByEmail(email) 

            if(employee){
                const isPasswordValid = await bcrypt.compare(password, employee.password )
                
                if(isPasswordValid){
                    return {
                        ...employee,
                        password: undefined
                    }
                }
            }
            throw new ForbiddenException('Endereço de Email ou senha incorretos')
        }catch(e){
            throw new ForbiddenException('Endereço de Email ou senha incorretos')
        }
  }
}
