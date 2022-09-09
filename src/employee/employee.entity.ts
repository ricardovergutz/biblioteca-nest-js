import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class employeeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    password: string
}