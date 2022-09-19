import { ConflictException, Injectable, NotAcceptableException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from '../person.entity';
import { UpdatePersonDTO } from '../updatePerson.dto';
import { employeeDto } from './employee.dto';
import { employeeEntity } from './employee.entity';
import { UpdateEmployeeDTO } from './employee.update.dto';
import * as bcrypt from 'bcrypt'

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
        return await this.employeeRepository.findOne({where: {id: id},
            relations:{
                person: true
            }
        })
    }

    async create(data: employeeDto): Promise<PersonEntity>{
        try{
        const person = await this.personRepository.save(data)

        let employee = new employeeEntity();
        employee.password = await bcrypt.hash(data.password, 10);
        employee.person = person;

        await this.employeeRepository.save(employee)
        
            return this.personRepository.findOneOrFail({ where : { id: employee.personId } });
        }catch(e){
            throw new ConflictException()
        }
        
      }

    async update (id: number, data: UpdateEmployeeDTO){
        const employee = await this.getOne(id)
        await this.employeeRepository.update(id, data)
        return employee
    }
    
    async destroy (id: number){
        const user = await this.employeeRepository.findOne({where: {id: id}})
        await this.employeeRepository.delete(id)
        return user;
    }

    async changePerson(id: number, data: UpdatePersonDTO): Promise<Partial<PersonEntity>>{
        let person = await this.personRepository.findOne({where: {id: id}, relations: {employee: true}})
    
        if(person?.employee){
          throw new NotAcceptableException();
        }
    
        const employee = new employeeEntity()
        employee.password = data.password
        employee.personId = id;
    
        return ( await this.employeeRepository.save(employee) )
      }
}