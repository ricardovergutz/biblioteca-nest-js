import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { employeeEntity } from './employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([employeeEntity])],
    providers: [EmployeeService],
    controllers: [EmployeeController]
})
export class EmployeeModule {}
