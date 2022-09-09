import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { PersonModule } from './person/person.module';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';
import { AuthorsModule } from './authors/authors.module';
import { BookAuthorsModule } from './book_authors/book_authors.module';
import { AuthorsController } from './authors/authors.controller';
import { BookAuthorsController } from './book_authors/book_authors.controller';
import { BookAuthorsModule } from './book_authors/book_authors.module';
import { BookAuthorsService } from './book_authors/book_authors.service';
import { BookAuthorsController } from './book_authors/book_authors.controller';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PersonModule, GenreModule, BookModule, AuthorsModule, BookAuthorsModule],
  controllers: [BookAuthorsController],
  providers: [BookAuthorsService],
})
export class AppModule {}