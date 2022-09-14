import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from '../person.entity';
import { employeeDto } from './employee.dto';
import { employeeEntity } from './employee.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(employeeEntity) private employeeRepository: Repository<employeeEntity>,
        @InjectRepository(PersonEntity) private personRepository: Repository<PersonEntity>
    ){}

    async getAll(): Promise<Partial<employeeEntity[]>>{
        return await this.employeeRepository.find({
            relations: {
                person: true
            }
        } )

    }

    async getOne(id: number){
        return await this.employeeRepository.findOne({where: {id: id}})
    }

    async create(data: employeeDto): Promise<Partial<employeeEntity>>{
        const person = await this.personRepository.save(data)
        
        let employee = new employeeEntity();
        employee.password = data.password;
        employee.person = person;

        await this.employeeRepository.save(employee);
        return data
      }

    async update (id: number, data: employeeDto){
        const employee = await this.employeeRepository.findOne({where: {id: id}, relations: {person: true}})
        
        return true
    }
    
    async destroy (id: number){
        const data = await this.employeeRepository.findOne({where: {id: id}})
        await this.employeeRepository.delete({id})
        return true
    }
}