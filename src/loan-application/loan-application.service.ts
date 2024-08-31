// loan-application.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { LoanApplication } from 'src/entities/loan-application.entity';
import { User } from 'src/entities/user.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Valuation } from 'src/entities/valuation.entity';

@Injectable()
export class LoanApplicationService {
  constructor(
    @InjectRepository(LoanApplication)
    private readonly loanApplicationRepository: Repository<LoanApplication>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Valuation)
    private readonly valuationRepository: Repository<Valuation>,
  ) {}

  async applyForLoan(userId: number, loanAmount: number): Promise<LoanApplication> {
    const user = await this.userRepository.findOne({ where : { id: userId }});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Check if user has a vehicle
    const vehicles = await this.vehicleRepository.find({ where: { user } });
    if (vehicles.length === 0) {
      throw new HttpException('User must have at least one vehicle to apply for a loan', HttpStatus.BAD_REQUEST);
    }

    // Create the loan application
    const loanApplication = this.loanApplicationRepository.create({
      user,
      loanAmount,
      status: 'processing',
    });

    return this.loanApplicationRepository.save(loanApplication);
  }

  async updateLoanStatus(loanId: number, status: 'approved' | 'disapproved'): Promise<LoanApplication> {
    const loanApplication = await this.loanApplicationRepository.findOne({ where: { id: loanId } });
    if (!loanApplication) {
      throw new HttpException('Loan application not found', HttpStatus.NOT_FOUND);
    }

    if (status === 'approved') {
        const vehicleIds = loanApplication.user.vehicles.map(vehicle => vehicle.id);
        const valuations = await this.valuationRepository.find({ where: { vehicle: In(vehicleIds) },});
        const totalEstimatedValue = valuations.reduce((sum, valuation) => sum + Number(valuation.estimatedValue), 0);

      if (totalEstimatedValue < loanApplication.loanAmount) {
        throw new HttpException('Loan cannot be approved because the total estimated value of vehicles is less than the loan amount', HttpStatus.BAD_REQUEST);
      }
    }

    //TODO: Send a push notification to the user a payload containing the {{status}}

    // Update and save the loan application status
    loanApplication.status = status;
    return this.loanApplicationRepository.save(loanApplication);
  }
}
