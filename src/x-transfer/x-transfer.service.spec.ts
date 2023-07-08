import { Test, TestingModule } from '@nestjs/testing';
import { XTransferService } from './x-transfer.service';

describe('XTransferService', () => {
  let service: XTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XTransferService],
    }).compile();

    service = module.get<XTransferService>(XTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
