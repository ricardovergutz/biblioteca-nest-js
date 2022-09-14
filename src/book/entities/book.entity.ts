import { Genre } from "src/genre/entities/genre.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(() => Genre, (genre) => genre.books)
    @JoinColumn({name: 'genreId'})
    genre: Genre;
}
