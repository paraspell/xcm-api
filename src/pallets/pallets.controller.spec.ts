import { Test, TestingModule } from '@nestjs/testing';
import { PalletsController } from './pallets.controller';
import { PalletsService } from './pallets.service';

describe('PalletsController', () => {
  let controller: PalletsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PalletsController],
      providers: [PalletsService],
    }).compile();

    controller = module.get<PalletsController>(PalletsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
