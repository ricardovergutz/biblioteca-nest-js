import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHideProperty, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiProperty, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { EmployeeService } from './employee/employ.service';
import { employeeDto } from './employee/employee.dto';
import { UpdateEmployeeDTO } from './employee/employee.update.dto';
import { employeeEntity } from './employee/employee.entity';
import { PersonDto } from './person.dto';
import { PersonService } from './person.service';
import { UpdatePersonDTO } from './updatePerson.dto';
import { PersonEntity } from './person.entity';


@Controller('person')
export class PersonController {
  constructor(private personService: PersonService,
              private employeeService: EmployeeService
    ){}

    @Put('change/:id')
    async changePerson(@Param('id') id: number, @Body() data: UpdatePersonDTO){
      const user = await this.employeeService.changePerson(id, data)
      return user
    }

    @ApiTags('employee')
    @ApiCreatedResponse({status: 201, description: 'Cria um funcionario.'})
    @Post('employee')
    async employeeCreate(@Body() data: employeeDto){
      const user = await this.employeeService.create(data)
      return user
    }
    @ApiTags('employee')
    @ApiResponse({status: 200, description: 'Busca todos os funcionarios.'})
    @Get('employee')
    async getEmployee(){
      const user = await this.employeeService.getAll()
      return user
    }
    @ApiTags('employee')
    @ApiOkResponse({
      status: 200, 
      schema: {
        allOf: [
          { "$ref" : getSchemaPath(employeeDto)  }
        ]
      },
    })
    @ApiNotFoundResponse({status: 404, description: "Not found"})
    @Get('employee/:id')
    async getOneEmployee(@Param('id') id:number){
      const user = await this.employeeService.getOne(id)
      if(!user){
        throw new NotFoundException({message: 'id não encontrado :D'})
      }
      return user
    }
    @ApiTags('employee')
    @HttpCode(204)
    @Delete('employee/:id')
    async deleteEmployee(@Param('id') id: number){
      const user = await this.employeeService.destroy(id)
      if(!user){
        throw new NotFoundException({message: 'id não encontrado :D'})
      }
      return user
    }
    @ApiTags('employee')
    @ApiResponse({status: 200, description: 'Atualiza a senha do funcionario.'})
    @Put('employee/:id')
    async UpdateEmployee(@Param('id') id: number, @Body() data: UpdateEmployeeDTO){
      const user = await this.employeeService.update(id, data)
      if(!user){
        throw new NotFoundException({message: 'id não encontrado :D'})
      }
      return user
    }

  @ApiTags('person')
  @HttpCode(200)
  @Get()
  async showAllPerson(){
    const data = this.personService.showAll();
    return data;
  }
  @ApiTags('person')
  @HttpCode(200)
  @Get(':id')
  async showOnePerson(@Param('id') id:number){
    const data = await this.personService.findOne(id, true);
    if(!data){
      throw new NotFoundException({message: 'id não encontrado :D'});
    }
    return data;
  }
  @ApiTags('person')
  @HttpCode(201)
  @Post()
  async create(@Body() person: PersonDto){
    const data = await this.personService.createPerson(person);
    return data;
  }
  @ApiTags('person')
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id:number, @Body() person:PersonDto){
    const data = await this.personService.update(id, person);
    if(!data){
      throw new NotFoundException({message: 'id não encontrado :D'})
    }
    return data;
  }

  @ApiTags('person')
  @HttpCode(204)
  @Delete(':id')
  async PersonDelete(@Param('id') id:number){
    const data = await this.personService.destroy(id);
    if (!data){
      throw new NotFoundException({message: 'id não encontrado :D'});
    }

    return data;
  }

}
