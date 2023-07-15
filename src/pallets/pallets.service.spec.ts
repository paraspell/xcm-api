import { Test, TestingModule } from '@nestjs/testing';
import { PalletsService } from './pallets.service';

describe('PalletsService', () => {
  let service: PalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PalletsService],
    }).compile();

    service = module.get<PalletsService>(PalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
