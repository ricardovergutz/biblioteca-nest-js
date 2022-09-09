import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee')
export class employeeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    password: string
}