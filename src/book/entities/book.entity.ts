import { PartialType } from '@nestjs/swagger';
import { Author } from 'src/authors/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  image_url: string;

  @Column()
  genreId?: number;

  @ManyToOne(() => Genre, (genre) => genre.books)
  @JoinColumn()
  genre: Genre;

  @ManyToMany(() => Author)
  @JoinTable({
    name: 'books_authors',
  })
  authors: Author[];
}
