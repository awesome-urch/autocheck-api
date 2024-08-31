// vehicle.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto, userId: number): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      user: { id: userId },
    });
    return this.vehicleRepository.save(vehicle);
  }

  async findAllByUser(userId: number): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ where: { user: { id: userId } } });
  }
}
