import { Controller, Post, Body, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoanApplicationService } from './loan-application.service';
import { LoanApplication } from 'src/entities/loan-application.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Loan Applications')
@ApiBearerAuth()
@Controller('loan-applications')
export class LoanApplicationController {
  constructor(private readonly loanApplicationService: LoanApplicationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Apply for a loan' })
  async applyForLoan(@Body('loanAmount') loanAmount: number, @Req() req): Promise<LoanApplication> {
    const userId = req.user.id;
    return this.loanApplicationService.applyForLoan(userId, loanAmount);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update loan status' })
  async updateLoanStatus(
    @Param('id') loanId: number,
    @Body('status') status: 'approved' | 'disapproved',
    @Req() req
  ): Promise<LoanApplication> {
    return this.loanApplicationService.updateLoanStatus(loanId, status);
  }
}
