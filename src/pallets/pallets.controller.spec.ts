import { Test, TestingModule } from '@nestjs/testing';
import { PalletsController } from './pallets.controller';
import { PalletsService } from './pallets.service';
import { TNode, TPallet } from '@paraspell/sdk';
import { mockRequestObject } from 'src/testUtils';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { createMock } from '@golevelup/ts-jest';

// Integration tests to ensure controller and service are working together
describe('PalletsController', () => {
  let controller: PalletsController;
  let palletsService: PalletsService;
  const node: TNode = 'Acala';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PalletsController],
      providers: [
        PalletsService,
        { provide: AnalyticsService, useValue: createMock<AnalyticsService>() },
      ],
    }).compile();

    controller = module.get<PalletsController>(PalletsController);
    palletsService = module.get<PalletsService>(PalletsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDefaultPallet', () => {
    it('should return the default pallet for the given node', async () => {
      const defaultPallet: TPallet = 'OrmlXTokens';
      jest
        .spyOn(palletsService, 'getDefaultPallet' as any)
        .mockResolvedValue(defaultPallet);

      const result = await controller.getDefaultPallet(node, mockRequestObject);

      expect(result).toBe(defaultPallet);
      expect(palletsService.getDefaultPallet).toHaveBeenCalledWith(node);
    });
  });

  describe('getPallets', () => {
    it('should return the list of pallets for the given node', async () => {
      const pallets: TPallet[] = ['OrmlXTokens', 'PolkadotXcm'];
      jest
        .spyOn(palletsService, 'getPallets' as any)
        .mockResolvedValue(pallets);

      const result = await controller.getPallets(node, mockRequestObject);

      expect(result).toBe(pallets);
      expect(palletsService.getPallets).toHaveBeenCalledWith(node);
    });
  });
});
