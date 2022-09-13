import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly author: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDTO: CreateAuthorDTO) {
    return await this.author.createAuthor(createAuthorDTO);
  }

  @Get()
  async findAllAuthors(): Promise<Author[]> {
    return await this.author.findAllAuthors();
  }

  @Get(':id')
  async findOneAuthorById(@Param('id') id: number) {
    return await this.author.findOneAuthorById(+id);
  }

  @Patch(':id')
  async updateAuthor(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.author.updateAuthor(+id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.author.deleteAuthor(+id);
  }
}
