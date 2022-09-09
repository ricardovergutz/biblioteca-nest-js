import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonEntity } from './person.entity';
import { PersonService } from './person.service';

@Module({ 
  imports:[TypeOrmModule.forFeature([PersonEntity])],
  controllers: [PersonController],
  providers: [PersonService]
})
export class PersonModule {}
