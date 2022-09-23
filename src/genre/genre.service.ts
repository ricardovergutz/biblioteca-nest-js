import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
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
    try{
      return await this.genreRepository.findOneOrFail({ where: { id } });
    }catch(err) {
      throw new NotFoundException();
    }
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
    const genrer = await this.findOne(id);
    try {
      await this.genreRepository.delete(genrer);
      return true;
    }catch (err){
      throw new NotAcceptableException();
    }
    
  }
}
