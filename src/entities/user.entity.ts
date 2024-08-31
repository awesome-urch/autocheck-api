import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LoanApplication } from './loan-application.entity';
import { Vehicle } from './vehicle.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @OneToMany(() => LoanApplication, (loanApplication) => loanApplication.user)
  loanApplications: LoanApplication[];
}
