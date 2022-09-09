import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee/employ.service';
import { employeeDto } from './employee/employee.dto';
import { PersonDto } from './person.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService,
              private employeeService: EmployeeService
    ){}

    @Post('employee')
    async createEmployee(@Body() data: employeeDto){
      const user = await this.employeeService.create(data)
      return user
    }
  
    @Get('employee')
    async getEmployee(){
      return await this.employeeService.getAll()
    }

    @Get()
  async showAllPerson(){
    const data = this.personService.showAll();
    return data;
  }

  @Get(':id')
  async showOnePerson(@Param('id') id:number){
    const data = await this.personService.findOne(id);
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
