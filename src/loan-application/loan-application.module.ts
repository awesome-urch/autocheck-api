import { Module } from '@nestjs/common';
import { LoanApplicationService } from './loan-application.service';
import { LoanApplicationController } from './loan-application.controller';

@Module({
  providers: [LoanApplicationService],
  controllers: [LoanApplicationController]
})
export class LoanApplicationModule {}
