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
    AuthorsService: any;
    constructor(private readonly author: AuthorsService) {}

    @Post()
    create(@Body() createAuthorDTO:CreateAuthorDTO){
      return this.AuthorsService.create(createAuthorDTO)
    }

    @Get()
    findAllAuthors(): Promise<Author[]>{
      return this.author.findAllAuthors();
    }

    @Get(':id')
    findOneAuthorById(@Param('id') id: number) {
      return this.AuthorsService.findOne(+id);
    }

    @Patch(':id')
    updateAuthor(@Param('id') id: number, @Body() updateAuthorDto:UpdateAuthorDto) {
      return this.AuthorsService.update(+id, updateAuthorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.AuthorsService.remove(+id);
    }
}
