import { Expose } from "class-transformer";
import { Column, Entity, Generated, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Generated()
  isEmployee: boolean

  @OneToOne(() =>employeeEntity, (employee) => employee.person)
  employee: employeeEntity

  @Expose()
  public get checkEmployee() {
    return this.employee !== null;
  }

  toJSON() {
    this.isEmployee = this.checkEmployee;
    return this;
  }
}