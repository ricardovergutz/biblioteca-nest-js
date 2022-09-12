import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { PersonModule } from './person/person.module';
/* import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';
import { AuthorsModule } from './authors/authors.module';
import { BookAuthorsModule } from './book_authors/book_authors.module'; */

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PersonModule/* , GenreModule, BookModule, AuthorsModule, BookAuthorsModule */],
})
export class AppModule {}