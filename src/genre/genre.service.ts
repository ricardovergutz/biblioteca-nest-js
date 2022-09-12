import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    return await this.genreRepository.save(createGenreDto);
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async findOne(id: number) {
    return await this.genreRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    await this.genreRepository.update({ id }, updateGenreDto);
    return await this.genreRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    await this.genreRepository.delete({ id });
    return { deleted: true };
  }
}
