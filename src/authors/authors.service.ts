import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDTO } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAllAuthors(): Promise<Author[]> {
    const authors = await this.authorRepository.find({
      relations: { books: true },
    });
    return authors;
  }

  async findOneAuthorById(id: number): Promise<Author> {
    const author = await this.authorRepository.findOneBy({ id: id });

    if (!author) {
      throw new NotFoundException(
        `Não foi possível encontrar o id ${id} requisitado`,
      );
    }
    return author;
  }

  async createAuthor(createAuthorDto: CreateAuthorDTO): Promise<Author> {
    return await this.authorRepository.save(createAuthorDto);
  }

  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.authorRepository.findOne({ where: { id: id } });

    await this.authorRepository.update({ id }, updateAuthorDto);

    return updateAuthorDto;
  }

  async deleteAuthor(id: number) {
    const deleteAuthor = await this.authorRepository.delete(id);
  }
}
