import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { User } from './user.entity';

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.loanApplications)
  user: User;

  @Column()
  applicantName: string;

  @Column('decimal')
  loanAmount: number;

  @Column()
  status: string;

}
