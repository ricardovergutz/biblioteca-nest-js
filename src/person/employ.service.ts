import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { employeeDto } from './employee.dto';
import { employeeEntity } from './employee.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(employeeEntity) private employeeRepository: Repository<employeeEntity>
    ){}

    async getAll(){
        return await this.employeeRepository.find()
    }

    async getOne(id: number){
        return await this.employeeRepository.findOne({where: {id: id}})
    }

    async create(data: employeeDto): Promise<employeeEntity>{
        return await this.employeeRepository.save(data)
    }
    async update (id: number, data: employeeDto){
        await this.employeeRepository.findOne({where: {id: id}})
        await this.employeeRepository.update({id}, data)
        return data
    }
    async destroy (id: number){
        const data = await this.employeeRepository.findOne({where: {id: id}})
        await this.employeeRepository.delete({id})
        return data
    }
}