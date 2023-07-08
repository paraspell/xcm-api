import { Test, TestingModule } from '@nestjs/testing';
import { XTransferController } from './x-transfer.controller';
import { XTransferService } from './x-transfer.service';

describe('XTransferController', () => {
  let controller: XTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XTransferController],
      providers: [XTransferService],
    }).compile();

    controller = module.get<XTransferController>(XTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
