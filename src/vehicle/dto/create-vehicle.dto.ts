import { IsString, IsNumber } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  vin: string;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  mileage: number;
}
