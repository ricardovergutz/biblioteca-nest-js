import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { PersonModule } from './person/person.module';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PersonModule, GenreModule, BookModule],
})
export class AppModule {}
