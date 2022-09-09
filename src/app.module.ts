import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { PersonModule } from './person/person.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PersonModule],
})
export class AppModule {}
