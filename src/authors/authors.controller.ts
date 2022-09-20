import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotAcceptableException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorBooksDTO } from './dto/create-author-books.dto';
import { CreateAuthorDTO } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Book } from 'src/book/entities/book.entity';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly author: AuthorsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createAuthorDTO: CreateAuthorDTO) {
    return await this.author.createAuthor(createAuthorDTO);
  }

  @Post('books/:id')
  @HttpCode(201)
  async createBooks(
    @Param('id') id: number,
    @Body() createAuthorBooksDTO: CreateAuthorBooksDTO,
  ): Promise<Author | null> {
    return await this.author.createAuthorBooks(id, createAuthorBooksDTO);
  }

  @Delete('books/:id')
  async deleteBooks(
    @Param('id') id: number,
    @Body() createAuthorBooksDTO: CreateAuthorBooksDTO,
  ): Promise<Author | null> {
    return await this.author.deleteAuthorBooks(id, createAuthorBooksDTO);
  }

  @Get()
  async findAllAuthors(): Promise<Author[]> {
    return await this.author.findAllAuthors();
  }

  @Get(':id/:books?')
  async findOneAuthorById(
    @Param('id') id: number,
    @Param('books') books: string,
  ) {
    return await this.author.findOneAuthorById(+id, books === 'books');
  }

  @Put(':id')
  async updateAuthor(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.author.updateAuthor(+id, updateAuthorDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const author = await this.author.deleteAuthor(id);
    if(!author){
      throw new NotAcceptableException()
    }
  }
}
