import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateBookAuthorsDTO } from './dto/create-book-authors.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('book')
@IsPublic()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('authors/:id')
  @HttpCode(201)
  async createAuthor(
    @Param('id') id: number,
    @Body() createBookAuthorsDTO: CreateBookAuthorsDTO,
  ): Promise<Book | null> {
    return await this.bookService.createBookAuthors(id, createBookAuthorsDTO);
  }

  @Delete('authors/:id')
  @HttpCode(201)
  async deleteAuthor(
    @Param('id') id: number,
    @Body() createBookAuthorsDTO: CreateBookAuthorsDTO,
  ): Promise<Book | null> {
    return await this.bookService.deleteBookAuthor(id, createBookAuthorsDTO);
  }

  @Post()
  @ApiBody({ type: CreateBookDto })
  @ApiTags('Book')
  @HttpCode(201)
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.create(createBookDto);
  }

  @HttpCode(200)
  @Get()
  @ApiTags('Book')
  async findAll() {
    return await this.bookService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  @ApiTags('Book')
  async findOne(@Param('id') id: number) {
    const book = await this.bookService.findOne(id);
    if (!book) {
      throw new NotFoundException({ message: 'id não encontrado' });
    }
    return book;
  }

  @HttpCode(200)
  @Put(':id')
  @ApiTags('Book')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    const data = await this.bookService.update(id, updateBookDto);
    if (!data) {
      throw new NotFoundException({ message: 'Id não encontrado' });
    }
    return data;
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiTags('Book')
  async remove(@Param('id') id: number) {
    const data = await this.bookService.remove(id);
    if (!data) {
      throw new NotFoundException({ message: 'Id não encontrado' });
    }
    return data;
  }
}
