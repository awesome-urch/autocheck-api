import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from 'src/entities/vehicle.entity';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto, @Req() req): Promise<Vehicle> {
    const userId = req.user.id;
    return this.vehicleService.create(createVehicleDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserVehicles(@Req() req): Promise<Vehicle[]> {
    const userId = req.user.id;
    return this.vehicleService.findAllByUser(userId);
  }
}
