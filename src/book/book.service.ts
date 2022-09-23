import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exit } from 'process';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';
import { Repository } from 'typeorm';
import { CreateBookAuthorsDTO } from './dto/create-book-authors.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';


@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) 
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author) 
    private readonly authorRepository: Repository<Author>,
    // private readonly authorService: AuthorsService
  ){}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try{
      let book = await this.bookRepository.create(createBookDto);
      await this.bookRepository.save(book);

      if (createBookDto.authorsId){
        await this.createBookAuthors(book.id, { authorsId: createBookDto.authorsId } );
        book = await this.findOne(book.id, true);
      }

      return book;
    } catch(err) {
      if (err.code==23505) {
        throw new ConflictException({message: "url já existente"});
      }else if(err.code==23503){
        throw new NotAcceptableException({message: "genreId not found"});
      }
      throw new NotAcceptableException({ message: err});
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
    createBookAuthorsDTO: CreateBookAuthorsDTO
  ): Promise<Book|null> {
    const book = await this.findOne(id, true);

    await Promise.all(
      createBookAuthorsDTO.authorsId.map(async (newAuthorId) =>{
        const actualAuthor = book.authors.find((author) => author.id === newAuthorId)
        if (!actualAuthor) {
          const newAuthor = await this.authorRepository.findOneByOrFail({id: newAuthorId});
          book.authors = [...book.authors, newAuthor];
        }
      }),
    );

    await this.bookRepository.save(book);
    return book;
  }

  async deleteBookAuthor(
    id: number,
    createBookAuthorsDTO: CreateBookAuthorsDTO
  ): Promise<Book|null>{
    const book = await this.findOne(id, true);

    createBookAuthorsDTO.authorsId.map((authorId) => {
      book.authors = book.authors.filter((author) => author.id !== authorId);
    });

    await this.bookRepository.save(book);
    return book;
  }
}


