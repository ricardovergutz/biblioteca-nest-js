import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { PersonModule } from './person/person.module';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PersonModule, GenreModule, BookModule, EmployeeModule],
})
export class AppModule {}
