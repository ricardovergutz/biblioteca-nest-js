import { Genre } from "src/genre/entities/genre.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Genre, (genre) => genre.book)
    @JoinColumn({name: 'genreId'})
    genre: Genre;
}
