import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { employeeEntity } from './employee.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(employeeEntity) private employeeRepository: Repository<employeeEntity>
    ){}

    async getAll(){
        return await this.employeeRepository.find()
    }
}
