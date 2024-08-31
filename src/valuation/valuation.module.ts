import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Valuation } from 'src/entities/valuation.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { ValuationService } from './valuation.service';
import { ValuationController } from './valuation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Valuation, Vehicle]),
    HttpModule,
  ],
  providers: [ValuationService],
  controllers: [ValuationController],
})
export class ValuationModule {}
