import { Injectable } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly personService: PersonService){}
    async validateUser(email: string ,password: string) {
        const user = await this.personService.findByEmail(email)

        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if(isPasswordValid){
                return {
                    ...user,
                    password: undefined
                }
            }
        }
        throw new Error('Enderesso de Email ou senha incorretos')
    }
}
