import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { GenreService } from 'src/genre/genre.service';
import { Genre } from 'src/genre/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre])],
  controllers: [BookController],
  providers: [BookService, GenreService],
})
export class BookModule {}
