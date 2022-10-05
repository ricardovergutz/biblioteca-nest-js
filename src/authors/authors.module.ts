import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
