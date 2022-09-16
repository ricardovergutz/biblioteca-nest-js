import { PartialType } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonDto } from "../person.dto";
import { PersonEntity } from "../person.entity";


@Entity('employee')
export class employeeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ select: false })
    password: string

    @OneToOne(() => PersonEntity, (person) => person.employee)
    @JoinColumn({name: 'personid'})
    person: PersonEntity
}