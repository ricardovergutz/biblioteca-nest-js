import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    try {
    return await this.genreRepository.save(createGenreDto);
    } catch(err) {
      throw new ConflictException({message: "Genero  já existente"});
    }
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async findOne(id: number) {
    return await this.genreRepository.findOne({ where: { id } });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    try {
    await this.genreRepository.update({ id }, updateGenreDto);
    return await this.genreRepository.findOne({ where: { id: id } });
    } catch(err) {
      throw new ConflictException({message: "Genero  já existente"});
    }
  }

  async remove(id: number) {
    await this.genreRepository.delete({ id });
    return { deleted: true };
  }
}
