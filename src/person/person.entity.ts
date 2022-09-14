import { Expose } from "class-transformer";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { employeeDto } from "./employee/employee.dto";
import { employeeEntity } from "./employee/employee.entity";

@Entity('person')
export class PersonEntity extends employeeDto{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @OneToOne(() =>employeeEntity, (employee) => employee.person)
  employee:employeeEntity

  @Expose()
  get isEmployee() {
    return (this.employee!==null);
  }
}