import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { BookService } from 'src/book/book.service';
import { Repository } from 'typeorm';
import { CreateAuthorBooksDTO } from './dto/create-author-books.dto';
import { CreateAuthorDTO } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    private readonly bookService: BookService
  ) {}

  async findAllAuthors(): Promise<Author[]> {
    const authors = await this.authorRepository.find({
      relations: { books: true },
    });
    return authors;
  }

  async findOneAuthorById(id: number, _books = false): Promise<Author> {
    try {
      return await this.authorRepository.findOneOrFail({
        where: { id },
        relations: { books: _books },
      });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async createAuthor(createAuthorDto: CreateAuthorDTO): Promise<Author> {
    return await this.authorRepository.save(createAuthorDto);
  }

  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.findOneAuthorById(id);

    await this.authorRepository.update({ id }, updateAuthorDto);

    return updateAuthorDto;
  }

  async deleteAuthor(id: number) {
    await this.findOneAuthorById(id);
    await this.authorRepository.delete(id);
  }

  async createAuthorBooks(
    id: number,
    createAuthorBooksDTO: CreateAuthorBooksDTO,
  ): Promise<Author|null> {
    const author = await this.authorRepository.findOneOrFail({
      where: { id: id },
      relations: { books: true },
    });

    await Promise.all(
      createAuthorBooksDTO.booksId.map(async (newBookId) => {
        const actualBook = author.books.find((book) => book.id === newBookId);
        if (!actualBook) {
          const newBook = await this.bookService.findOne(newBookId);
          author.books = [...author.books, newBook];
        }
      }),
    );

    await this.authorRepository.save(author);
    return author;
  }

  async deleteAuthorBooks(
    id: number,
    createAuthorBooksDTO: CreateAuthorBooksDTO,
  ): Promise<Author|null> {
    const author = await this.findOneAuthorById(id, true);

    createAuthorBooksDTO.booksId.map((bookId) => {
      author.books = author.books.filter((book) => book.id !== bookId);
    });

    await this.authorRepository.save(author);
    return author;
  }
}
