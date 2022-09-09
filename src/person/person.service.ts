import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonDto } from './person.dto';
import { PersonEntity } from './person.entity';

@Injectable()
export class PersonService {
  constructor(@InjectRepository(PersonEntity) private personRepository: Repository <PersonEntity>){}

  async showAll(){
    return await this.personRepository.find();
  }

  async findOne(id:number){
    return await this.personRepository.findOne({where: {id}})
  }

  async createPerson(person: PersonDto): Promise<PersonEntity>{
    const data = await this.personRepository.save(person);
    return data;
  }

  async update(id: number, person:PersonDto){
    const batata = await this.personRepository.findOne({where: {id: id}});
    if(!batata){
      throw new NotFoundException();
    }
    await this.personRepository.update({id}, person);
    return person;
  }

  async destroy(id:number){
    const data = await this.personRepository.findOne({where: {id}})
    await this.personRepository.delete(id)
    return data
  }
}
