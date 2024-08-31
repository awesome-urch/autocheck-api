import { IsNumber } from 'class-validator';

export class CreateValuationDto {
  @IsNumber()
  estimatedValue: number;

  @IsNumber()
  vehicleId: number;
}
