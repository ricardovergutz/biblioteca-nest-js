import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonDto } from './person.dto';
import { PersonEntity } from './person.entity';
import { EmployeeService } from './employee/employ.service';
import { employeeEntity } from './employee/employee.entity';

@Injectable()
export class PersonService {
  constructor(@InjectRepository(PersonEntity)
  private personRepository: Repository<PersonEntity>,
  @InjectRepository(employeeEntity)
  private employeeRepository: Repository<employeeEntity>,
    private employeeService: EmployeeService) {}

  async showAll() {
    return await this.personRepository.find({relations: {
      employee: true
    }});
  }

  async findOne(id: number, employee = false) {
    try {
      return await this.personRepository.findOneOrFail({ where: { id }, relations: { employee: employee, }, });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async createPerson(person: PersonDto): Promise<PersonEntity> {
    try{
      const data = await this.personRepository.save(person);
      return data;
    }catch(e){
      throw new ConflictException({message: 'email ja existe'})
    }
    
  }

  async update(id: number, person: PersonDto) {
    try{
      await this.personRepository.update(id, person);
      return await this.findOne(id);
    }catch(e){
      throw new ConflictException({message: 'email ja existe'})
    }
  }

  async destroy(id: number) {
    const person = await this.findOne(id, true);
    if (person.employee) {
      await this.employeeService.destroy(person.employee.id);
    }
    await this.personRepository.delete(id);
    return true;
  }

  async findByEmail(email: string){
    return await this.employeeRepository.createQueryBuilder('employee')
    .select("employee.password")
    .innerJoinAndSelect('employee.person', 'person')
    .where('person.email = :email', { email })
    .getOneOrFail()
  }
}
