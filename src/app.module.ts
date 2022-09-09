import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { PersonModule } from './person/person.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PersonModule, EmployeeModule],
})
export class AppModule {}
