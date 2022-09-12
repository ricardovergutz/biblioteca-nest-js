import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiBody({ type: CreateGenreDto})
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  async index(): Promise<Genre[]> {
    return await this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.genreService.remove(+id);
  }
}
