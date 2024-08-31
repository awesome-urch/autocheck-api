import { Test, TestingModule } from '@nestjs/testing';
import { ValuationController } from './valuation.controller';

describe('ValuationController', () => {
  let controller: ValuationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValuationController],
    }).compile();

    controller = module.get<ValuationController>(ValuationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
