import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeOrm.config';
import { PersonModule } from './person/person.module';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PersonModule, GenreModule, BookModule,AuthModule
    // , AuthorsModule
  ],

})
export class AppModule {}