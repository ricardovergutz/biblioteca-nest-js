import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('person')
export class PersonEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string
}