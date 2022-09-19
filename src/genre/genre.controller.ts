import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @HttpCode(201)
  @Post()
  @ApiBody({ type: CreateGenreDto})
  @ApiTags('Genre')
  create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiTags('Genre')
  async index(): Promise<Genre[]> {
    return await this.genreService.findAll();
  }

  @Get(':id')
  @ApiTags('Genre')
  async findOne(@Param('id') id: number){
    const genre = await this.genreService.findOne(id);
    if(!genre){
      throw new NotFoundException({message: 'id não encontrado'});
    }
  }

  @HttpCode(200)
  @Patch(':id')
  @ApiTags('Genre')
  async update(@Param('id') id: number, @Body() updateGenreDto: UpdateGenreDto) {
    const data = await this.genreService.update(id, updateGenreDto);
    if(!data){
      throw new NotFoundException({message: 'id não encontrado'});
    }
    return data;
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiTags('Genre')
  async remove(@Param('id') id: number) {
    const data = await this.genreService.remove(id);
    if(!data){
      throw new NotFoundException({message: 'id não encontrado'});
    }
    return data;
  }
}
