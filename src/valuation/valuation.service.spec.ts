import { Test, TestingModule } from '@nestjs/testing';
import { ValuationService } from './valuation.service';

describe('ValuationService', () => {
  let service: ValuationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValuationService],
    }).compile();

    service = module.get<ValuationService>(ValuationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
