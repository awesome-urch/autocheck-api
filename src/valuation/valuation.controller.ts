import { Controller, Get, Param } from '@nestjs/common';
import { ValuationService } from './valuation.service'; // Adjust the path as necessary
import { Valuation } from '../entities/valuation.entity'; // Adjust the path as necessary

@Controller('valuations')
export class ValuationController {
  constructor(private readonly valuationService: ValuationService) {}

  @Get(':vehicleId')
  async getValuation(@Param('vehicleId') vehicleId: number): Promise<Valuation> {
    return this.valuationService.getVehicleValuation(vehicleId);
  }
}
