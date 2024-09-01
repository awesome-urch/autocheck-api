import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Valuation } from '../entities/valuation.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateValuationDto } from './dto/create-valuation.dto';
import { ConfigService } from '@nestjs/config'; 

@Injectable()
export class ValuationService {
  constructor(
    @InjectRepository(Valuation)
    private readonly valuationRepository: Repository<Valuation>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getVehicleValuation(vehicleId: number): Promise<Valuation> {
    const vehicle = await this.vehicleRepository.findOne({ where : { id: vehicleId } });
    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.BAD_GATEWAY);
    }

    // Make API call to get valuation
    const vin = vehicle.vin;
    const url = `https://vin-lookup2.p.rapidapi.com/vehicle-lookup?vin=${vin}`;
    const headers = {
      'x-rapidapi-host': 'vin-lookup2.p.rapidapi.com',
      'x-rapidapi-key': this.configService.get<string>('RAPID_API_KEY'),
    };

    try {
      const response = await this.httpService
        .get(url, { headers })
        .toPromise();

      const { loan_value } = response.data;

      if(!loan_value){
        throw new HttpException('Invalid request. Check the VIN and retry.', HttpStatus.NOT_ACCEPTABLE);
      }

      // Create and save the valuation
      const valuation = this.valuationRepository.create({
        vehicle,
        estimatedValue: loan_value,
        valuationDate: new Date(),
      });

      return this.valuationRepository.save(valuation);
    } catch (error) {
      throw new HttpException('Failed to retrieve vehicle valuation', HttpStatus.BAD_GATEWAY);
    }

  }
}
