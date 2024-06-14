import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
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
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Author[]> {
    const authors = await this.authorRepository.find({
      relations: { books: true },
    });
    return authors;
  }

  async findOne(id: number, _books = false): Promise<Author> {
    try {
      return await this.authorRepository.findOneOrFail({
        where: { id },
        relations: { books: _books },
      });
    } catch (err) {
      throw new NotFoundException({message: "Não foi possível encontrar o autor requisitado"});
    }
  }

  async create(createAuthorDto: CreateAuthorDTO){
    try {
      // await this.findOneAuthorById(id); corrigir para puxar o id
    return await this.authorRepository.save(createAuthorDto);
    } catch(err) {
      throw new ConflictException({message: "Nome já existe ou não foi informado corretamente"});
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    
    try{
    await this.findOne(id);
    await this.authorRepository.update({ id }, updateAuthorDto);
    return updateAuthorDto;
    } catch (err) {
      throw new ConflictException({message: `Autor já existente id: ${id}`});
    }
  }

  async delete(id: number) {
    await this.findOne(id);
    try {
      let result = await this.authorRepository.delete(id);
      if (result.affected===1){
        return true;
      }else{
        throw new NotAcceptableException();
      }
    } catch (e){
      throw new NotAcceptableException();
    }
  }

  async createAuthorBooks(
    id: number,
    createAuthorBooksDTO: CreateAuthorBooksDTO,
  ): Promise<Author|null> {
    const author = await this.findOne(id, true);

    await Promise.all(
      createAuthorBooksDTO.booksId.map(async (newBookId) => {
        const actualBook = author.books.find((book) => book.id === newBookId);
        if (!actualBook) {
          try{
            const newBook = await this.bookRepository.findOneByOrFail({id: newBookId});
            author.books = [...author.books, newBook];
          }catch(err){
            throw new NotAcceptableException({message: `Book not found: ${newBookId}`, id: newBookId });
          }
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
    const author = await this.findOne(id, true);

    createAuthorBooksDTO.booksId.map((bookId) => {
      author.books = author.books.filter((book) => book.id !== bookId);
    });

    await this.authorRepository.save(author);
    return author;
  }
}
