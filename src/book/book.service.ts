import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsService } from 'src/authors/authors.service';
import { CreateAuthorBooksDTO } from 'src/authors/dto/create-author-books.dto';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';


@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) 
    private readonly bookRepository: Repository<Book>,
    private readonly authorService: AuthorsService
  ){}

  async create(createBookDto: CreateBookDto, id?: number): Promise<Book> {
    try{
    return await this.bookRepository.save(createBookDto);
  } catch(err) {
    throw new ConflictException({message: "url  já existente"});
  }
  }

  async findAll() {
    return await this.bookRepository.find({relations: {genre: true, authors: true}});
  }

  async findOne(id: number, _authors = false): Promise<Book> {
    try{
      return await this.bookRepository.findOneOrFail({where: {id}, relations: { genre: true, authors: _authors}});
    }catch(err){
      throw new NotFoundException();       
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try{
    await this.bookRepository.update({ id }, updateBookDto);
    return await this.bookRepository.findOne({ where: { id: id } });
    } catch(err){
      throw new ConflictException({message: "url já existente"});
    }
  }

  async remove(id: number) {
    try{
      let result =  await this.bookRepository.delete({id});
      if(result.affected===1){
      return true;
      }else{
        throw new NotAcceptableException();
      }
    } catch (e){
        throw new NotAcceptableException()
    }
  }

  async createBookAuthors(
    id: number,
    createAuthorBooksDTO: CreateAuthorBooksDTO
  ): Promise<Book|null> {
    const book = await this.findOne(id, true);

    await Promise.all(
      createAuthorBooksDTO.authorsId.map(async (newAuthorId) =>{
        const actualAuthor = book.authors.find((author) => author.id === newAuthorId)
        if (!actualAuthor) {
          const newAuthor = await this.authorService.findOneAuthorById(newAuthorId);
          book.authors = [...book.authors, newAuthor];
        }
      }),
    );

    await this.bookRepository.save(book);
    return book;
  }

  async deleteBookAuthor(
    id: number,
    createAuthorBooksDTO: CreateAuthorBooksDTO
  ): Promise<Book|null>{
    const book = await this.findOne(id, true);

    createAuthorBooksDTO.authorsId.map((authorId) => {
      book.authors = book.authors.filter((author) => author.id !== authorId);
    });

    await this.bookRepository.save(book);
    return book;
  }
}


