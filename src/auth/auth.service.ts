import { ForbiddenException, Injectable } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import * as bcrypt from 'bcrypt'
import { PersonEntity } from 'src/person/person.entity';



import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { LoginDTO } from 'src/person/login.dto';

@Injectable()
export class AuthService {
    
    constructor(private readonly personService: PersonService,
                private readonly jwtService: JwtService
        ){}
    login(user: PersonEntity): UserToken {
        const payload: UserPayload  = {
            sub: user.id,
            email: user.email,
            name: user.name,
            isEmployee: true
         }

         const jwtToken = this.jwtService.sign(payload)
         return{
            access_token: jwtToken
         }
    }
    async validateUser({email, password}: LoginDTO){
        try{
            const employee = await this.personService.findByEmail(email) 

            if(employee){
                const isPasswordValid = await bcrypt.compare(password, employee.password )
                
                if(isPasswordValid){
                    return employee.person;
                }
            }
            throw new ForbiddenException('Endereço de Email ou senha incorretos')
        }catch(e){
            throw new ForbiddenException('Endereço de Email ou senha incorretos')
        }
  }
}
