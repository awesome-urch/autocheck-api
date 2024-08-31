import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanApplication } from 'src/entities/loan-application.entity';
import { LoanApplicationService } from './loan-application.service'; // Adjust the path as necessary
import { LoanApplicationController } from './loan-application.controller'; // Adjust the path as necessary
import { User } from 'src/entities/user.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Valuation } from 'src/entities/valuation.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoanApplication, User, Vehicle, Valuation]), forwardRef(() => AuthModule)
  ],
  providers: [LoanApplicationService],
  controllers: [LoanApplicationController],
})
export class LoanApplicationModule {}
