import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Vehicle } from "./vehicle.entity";

@Entity()
export class Valuation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Vehicle)
    vehicle: Vehicle;

    @Column('decimal')
    estimatedValue: number;

    @Column()
    valuationDate: Date;

}