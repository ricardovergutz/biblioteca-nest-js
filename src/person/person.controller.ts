import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee/employ.service';
import { employeeDto } from './employee/employee.dto';
import { employeeEntity } from './employee/employee.entity';
import { PersonDto } from './person.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService,
              private employeeService: EmployeeService
    ){}

    @Post('employee')
    async employeeCreate(@Body() data: employeeDto){
      const user = await this.employeeService.create(data)
      return {
        "personId":user.id,
        "name":user.name,
        "email":user.email,
      }
    }

    @Get('employee')
    async getEmployee(){
      const user = await this.employeeService.getAll()
      return user
    }

    @Get('employee/:id')
    async getOneEmployee(@Param('id') id:number){
      const user = await this.employeeService.getOne(id)
      if(!user){
        throw new NotFoundException({message: 'largue mão de ser indiota :D'})
      }
      return user
    }
    @Delete('employee/:id')
    async deleteEmployee(@Param('id') id: number){
      const user = await this.employeeService.destroy(id)
      if(!user){
        throw new NotFoundException({message: 'id não encontrado'})
      }
      return user
    }
    @Put('employee/:id')
    async UpdateEmployee(@Param('id') id: number, @Body() data: employeeDto){
      const user = await this.employeeService.update(id, data)
      return user
    }

    @Get()
  async showAllPerson(){
    const data = this.personService.showAll();
    return data;
  }

  @Get(':id')
  async showOnePerson(@Param('id') id:number){
    const data = await this.personService.findOne(id, true);
    if(!data){
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  async create(@Body() person: PersonDto){
    const data = await this.personService.createPerson(person);
    return data;
  }

  @Put(':id')
  async update(@Param('id') id:number, @Body() person:PersonDto){
    const data = await this.personService.update(id, person);
    return data;
  }

  @Delete(':id')
  async PersonDelete(@Param('id') id:number){
    const data = await this.personService.destroy(id);
    if (!data){
      throw new NotFoundException();
    }

    return data;
  }

}
