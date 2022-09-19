import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';


@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ){}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try{
    return await this.bookRepository.save(createBookDto);
  } catch(err) {
    throw new ConflictException({message: "url  já existente"});
  }
  }

  async findAll() {
    return await this.bookRepository.find({relations: {genre: true}});
  }

  async findOne(id: number) {
    try{
      return await this.bookRepository.findOneOrFail({where: {id}});
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
    await this.bookRepository.delete({id});
    return {deleted: true};
  }
}
