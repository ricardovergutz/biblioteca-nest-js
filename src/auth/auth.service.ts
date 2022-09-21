import { Injectable } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import * as bcrypt from 'bcrypt'
import { EmployeeService } from 'src/person/employee/employ.service';
import { employeeEntity } from 'src/person/employee/employee.entity';
@Injectable()
export class AuthService {
    constructor(private readonly personService: PersonService,
                private readonly employeeService: EmployeeService
        ){}
    async validateUser(email: string ,password: string){
        
        const user = await this.personService.findByEmail(email)

        const employee = new employeeEntity()
        employee.password = password

        if(user){
            const isPasswordValid = await bcrypt.compare(password, employee.password)
            console.log(employee.password) 
            console.log(password)
            console.log(user.email)

            if(isPasswordValid){
                return {
                    ...user,
                    /* password: undefined */
                }
            }
        }
        throw new Error('Enderesso de Email ou senha incorretos')
  }
}
