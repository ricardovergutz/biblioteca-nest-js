import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class books_authors_service {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
}
