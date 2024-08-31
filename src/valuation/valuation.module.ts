import { Module } from '@nestjs/common';
import { ValuationService } from './valuation.service';
import { ValuationController } from './valuation.controller';

@Module({
  providers: [ValuationService],
  controllers: [ValuationController]
})
export class ValuationModule {}
