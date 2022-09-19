import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Book } from 'src/book/entities/book.entity';
import { Validate } from 'class-validator';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true}) 
  name: string;

  @ManyToMany(() => Book)
  @JoinTable({
    name: "books_authors",
  })
  books: Book[];
}
