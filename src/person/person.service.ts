import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonDto } from './person.dto';
import { PersonEntity } from './person.entity';
import { EmployeeService } from './employee/employ.service';

@Injectable()
export class PersonService {
  constructor(@InjectRepository(PersonEntity)
  private personRepository: Repository<PersonEntity>,
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
    const data = await this.personRepository.save(person);
    return data;
  }

  async update(id: number, person: PersonDto) {
    await this.personRepository.update(id, person);
    return await this.findOne(id);
  }

  async destroy(id: number) {
    const person = await this.findOne(id, true);
    if (person.employee) {
      await this.employeeService.destroy(person.employee.id);
    }
    await this.personRepository.delete(id);
    return true;
  }

}
