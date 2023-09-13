import { Test, TestingModule } from '@nestjs/testing';
import { XTransferController } from './x-transfer.controller';
import { XTransferService } from './x-transfer.service';
import { XTransferDto } from './dto/XTransferDto';
import { mockRequestObject } from 'src/testUtils';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { createMock } from '@golevelup/ts-jest';

// Integration tests to ensure controller and service are working together
describe('XTransferController', () => {
  let controller: XTransferController;
  let service: XTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XTransferController],
      providers: [
        XTransferService,
        { provide: AnalyticsService, useValue: createMock<AnalyticsService>() },
      ],
    }).compile();

    controller = module.get<XTransferController>(XTransferController);
    service = module.get<XTransferService>(XTransferService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('generateXcmCall', () => {
    it('should call generateXcmCall service method with correct parameters and return result', async () => {
      const queryParams: XTransferDto = {
        from: 'Acala',
        to: 'Basilisk',
        amount: 100,
        address: '0x123456789',
        currency: 'DOT',
      };
      const mockResult = 'serialized-api-call';
      jest
        .spyOn(service, 'generateXcmCall' as any)
        .mockResolvedValue(mockResult);

      const result = await controller.generateXcmCall(
        queryParams,
        mockRequestObject,
      );

      expect(result).toBe(mockResult);
      expect(service.generateXcmCall).toHaveBeenCalledWith(queryParams);
    });
  });
});
