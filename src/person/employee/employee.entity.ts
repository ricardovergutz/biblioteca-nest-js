import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonDto } from "../person.dto";
import { PersonEntity } from "../person.entity";


@Entity('employee')
export class employeeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ select: false })
    password: string

    @ApiProperty()
    @Column({select:false})
    personId?: number

    @OneToOne(() => PersonEntity, (person) => person.employee)
    @JoinColumn()
    person: PersonEntity
}