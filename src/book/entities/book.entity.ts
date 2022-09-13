import { IsNotEmpty } from "class-validator";
import { Genre } from "src/genre/entities/genre.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    genreId: number;
    @ManyToOne(() => Genre, (genre) => genre.id)
    @JoinColumn({name: 'genreId'})
    genre: Genre;
}
