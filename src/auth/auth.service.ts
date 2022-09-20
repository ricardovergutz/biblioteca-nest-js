import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    validateUser(password: string) {
        throw new Error('Method not implemented.');
    }
}
