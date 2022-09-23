import { ForbiddenException, Injectable } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import * as bcrypt from 'bcrypt'
import { EmployeeService } from 'src/person/employee/employ.service';
import { employeeEntity } from 'src/person/employee/employee.entity';
import { employeeDto } from 'src/person/employee/employee.dto';
import { PersonEntity } from 'src/person/person.entity';
@Injectable()
export class AuthService {
    constructor(private readonly personService: PersonService,
                private readonly employeeService: EmployeeService
        ){}
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
