import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { booksAuthorscontroller } from 'src/authors/books_authors.controller';
import { Genre } from 'src/genre/entities/genre.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';


@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>
  ){}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    let genre = new Genre();
    genre.name = 'teste';
    await this.genreRepository.save(genre);

    let book = new Book();
    book.name = createBookDto.name;
    book.url = createBookDto.url
    book.genre = genre;
    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find({relations: {genre: true}});
  }

  async findOne(id: number) {
    return await this.bookRepository.findOne({where: {id:id}});
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.bookRepository.update({id}, updateBookDto);
    return await this.bookRepository.findOne({where: {id:id}});
  }

  async remove(id: number) {
    await this.bookRepository.delete({id});
    return {deleted: true};
  }
}
