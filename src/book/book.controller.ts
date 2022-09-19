import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBody({ type: CreateBookDto})
  @HttpCode(201)
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.create(createBookDto);
  }

  @HttpCode(200)
  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const book = await this.bookService.findOne(id);
    if(!book){
      throw new NotFoundException({message: 'id não encontrado'});
    }
    return book;
  }

  @HttpCode(200)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    const data = await this.bookService.update(id, updateBookDto);
    if(!data){
      throw new NotFoundException({message: 'Id não encontrado'});
    }
    return data;
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.bookService.remove(id);
    if(!data){
      throw new NotFoundException({message: 'Id não encontrado'});
    }
    return data;
  }
}
