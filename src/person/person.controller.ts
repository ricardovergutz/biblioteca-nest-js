import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHideProperty, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiProperty, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { EmployeeService } from './employee/employ.service';
import { employeeDto } from './employee/employee.dto';
import { UpdateEmployeeDTO } from './employee/employee.update.dto';
import { employeeEntity } from './employee/employee.entity';
import { PersonDto } from './person.dto';
import { PersonService } from './person.service';
import { UpdatePersonDTO } from './updatePerson.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { PersonEntity } from './person.entity';


@Controller('person')
export class PersonController {
  constructor(private personService: PersonService,
              private employeeService: EmployeeService
    ){}

    @Get('user')
    getUser(@CurrentUser() user: PersonEntity){
      return user
    }

    @ApiTags('employee')
    @Put('change/:id')
    @IsPublic()
    async changePerson(@Param('id') id: number, @Body() data: UpdatePersonDTO){
      const user = await this.employeeService.changePerson(id, data)
      return user
    }

    @ApiTags('employee')
    @ApiCreatedResponse({status: 201, description: 'Cria um funcionario.'})
    @Post('employee')
    @IsPublic()
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
    @ApiResponse({status: 200, description: 'Busca apenas 1 funcionario.'})
    @IsPublic()
    @Get('employee/:id')
    async getOneEmployee(@Param('id') id:number){
      const user = await this.employeeService.getOne(id)
      if(!user){
        throw new NotFoundException({message: 'id não encontrado :D'})
      }
    return user;
    }
    @ApiTags('employee')
    @IsPublic()
    @ApiResponse({status: 204, description: 'Deleta um funcionario'})
    @Delete('employee/:id')
    async deleteEmployee(@Param('id') id: number){
      const user = await this.employeeService.destroy(id)
      if(!user){
        throw new NotFoundException({message: 'id não encontrado :D'})
      }
      return user
    }
    @ApiTags('employee')
    @IsPublic()
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
  @IsPublic()
  @ApiResponse({status: 200, description: 'Busca todos os funcionarios.'})
  @Get()
  async showAllPerson(){
    const data = this.personService.showAll();
    return data;
  }
  @ApiTags('person')
  @IsPublic()
  @ApiNotFoundResponse({status: 404, description: "Not found"})
  @ApiResponse({status: 200, description: 'Busca apenas 1 pessoa.'})
  @Get(':id')
  async showOnePerson(@Param('id') id: number) {
    const data = await this.personService.findOne(id, true);

    return data.toJSON();
  }
  @ApiTags('person')
  @IsPublic()
  @ApiCreatedResponse({status: 201, description: 'Cria uma pessoa.'})
  @Post()
  async create(@Body() person: PersonDto){
    const data = await this.personService.createPerson(person);
    return data;
  }
  @ApiTags('person')
  @IsPublic()
  @ApiResponse({status: 200, description: 'Atualiza o nome ou email da pessoa.'})
  @Put(':id')
  async update(@Param('id') id: number, @Body() person: PersonDto) {
    const data = await this.personService.update(id, person);
    if(!data){
      throw new NotFoundException({message: 'id não encontrado :D'})
    }
    return data;
  }

  @ApiTags('person')
  @IsPublic()
  @ApiResponse({status: 204, description: 'Deleta uma pessoa'})
  @Delete(':id')
  async PersonDelete(@Param('id') id:number){
    const data = await this.personService.destroy(id);
    if (!data){
      throw new NotFoundException({message: 'id não encontrado :D'});
    }

    return data;
  }
}
