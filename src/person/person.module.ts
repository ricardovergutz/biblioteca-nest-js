import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee/employ.service';
import { employeeEntity } from './employee/employee.entity';
import { PersonController } from './person.controller';
import { PersonEntity } from './person.entity';
import { PersonService } from './person.service';

@Module({ 
  imports:[TypeOrmModule.forFeature([PersonEntity, employeeEntity])],
  controllers: [PersonController],
  providers: [PersonService, EmployeeService]
})
export class PersonModule {}
