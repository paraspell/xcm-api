import { Test, TestingModule } from '@nestjs/testing';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { TNode } from '@paraspell/sdk';
import { mockRequestObject } from 'src/testUtils';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { createMock } from '@golevelup/ts-jest';

// Integration tests to ensure controller and service are working together
describe('AssetsController', () => {
  let controller: AssetsController;
  let assetsService: AssetsService;
  const node: TNode = 'Acala';
  const symbol = 'KSM';
  const decimals = 18;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [
        AssetsService,
        { provide: AnalyticsService, useValue: createMock<AnalyticsService>() },
      ],
    }).compile();

    controller = module.get<AssetsController>(AssetsController);
    assetsService = module.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNodeNames', () => {
    it('should return the list of node names', () => {
      const mockResult = ['Acala', 'Basilisk'];
      jest
        .spyOn(assetsService, 'getNodeNames' as any)
        .mockReturnValue(mockResult);

      const result = controller.getNodeNames(mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getNodeNames).toHaveBeenCalled();
    });
  });

  describe('getNodeNames', () => {
    it('should return the list of node names', () => {
      const mockResult = [node, 'Basilisk'];
      jest
        .spyOn(assetsService, 'getNodeNames' as any)
        .mockReturnValue(mockResult);

      const result = controller.getNodeNames(mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getNodeNames).toHaveBeenCalled();
    });
  });

  describe('getAssetsObject', () => {
    const mockResult = {
      paraId: 2009,
      relayChainAssetSymbol: 'KSM',
      nativeAssets: [{ symbol, decimals }],
      otherAssets: [{ assetId: '234123123', symbol: 'FKK', decimals }],
    };
    it('should return assets object for a valid node', () => {
      jest
        .spyOn(assetsService, 'getAssetsObject' as any)
        .mockReturnValue(mockResult);

      const result = controller.getAssetsObject(node, mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getAssetsObject).toHaveBeenCalledWith(node);
    });

    it('should return assets object for a valid parachain id', () => {
      const paraId = '2009';
      jest
        .spyOn(assetsService, 'getNodeByParaId' as any)
        .mockReturnValue(mockResult);

      const result = controller.getAssetsObject(paraId, mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getNodeByParaId).toHaveBeenCalledWith(
        Number(paraId),
      );
    });
  });

  describe('getAssetId', () => {
    it('should return asset ID for a valid node and symbol', () => {
      const symbol = 'DOT';
      const mockResult = '1';
      jest.spyOn(assetsService, 'getAssetId').mockReturnValue(mockResult);

      const result = controller.getAssetId(node, { symbol }, mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getAssetId).toHaveBeenCalledWith(node, symbol);
    });
  });

  describe('getRelayChainSymbol', () => {
    it('should return relay chain symbol for a valid node', () => {
      const mockResult = 'KSM';
      jest
        .spyOn(assetsService, 'getRelayChainSymbol')
        .mockReturnValue(mockResult);

      const result = controller.getRelayChainSymbol(node, mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getRelayChainSymbol).toHaveBeenCalledWith(node);
    });
  });

  describe('getNativeAssets', () => {
    it('should return native assets for a valid node', () => {
      const mockResult = [{ symbol, decimals }];
      jest.spyOn(assetsService, 'getNativeAssets').mockReturnValue(mockResult);

      const result = controller.getNativeAssets(node, mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getNativeAssets).toHaveBeenCalledWith(node);
    });
  });

  describe('getOtherAssets', () => {
    it('should return other assets for a valid node', () => {
      const mockResult = [{ assetId: '234123123', symbol: 'FKK', decimals }];
      jest.spyOn(assetsService, 'getOtherAssets').mockReturnValue(mockResult);

      const result = controller.getOtherAssets(node, mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getOtherAssets).toHaveBeenCalledWith(node);
    });
  });

  describe('getAllAssetsSymbol', () => {
    it('should return all assets symbols for a valid node', () => {
      const mockResult = [symbol, 'DOT'];
      jest
        .spyOn(assetsService, 'getAllAssetsSymbols')
        .mockReturnValue(mockResult);

      const result = controller.getAllAssetsSymbol(node, mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getAllAssetsSymbols).toHaveBeenCalledWith(node);
    });
  });

  describe('getDecimals', () => {
    it('should return decimals for a valid node and symbol', () => {
      const mockResult = 18;
      jest.spyOn(assetsService, 'getDecimals').mockReturnValue(mockResult);

      const result = controller.getDecimals(
        node,
        { symbol },
        mockRequestObject,
      );

      expect(result).toBe(mockResult);
      expect(assetsService.getDecimals).toHaveBeenCalledWith(node, symbol);
    });
  });

  describe('hasSupportForAsset', () => {
    it('should return true if asset is supported for a valid node and symbol', () => {
      const mockResult = true;
      jest
        .spyOn(assetsService, 'hasSupportForAsset')
        .mockReturnValue(mockResult);

      const result = controller.hasSupportForAsset(
        node,
        { symbol },
        mockRequestObject,
      );

      expect(result).toBe(mockResult);
      expect(assetsService.hasSupportForAsset).toHaveBeenCalledWith(
        node,
        symbol,
      );
    });
  });

  describe('getParaId', () => {
    it('should return parachain id for a valid node', () => {
      const mockResult = 2009;
      jest.spyOn(assetsService, 'getParaId').mockReturnValue(mockResult);

      const result = controller.getParaId(node, mockRequestObject);

      expect(result).toBe(mockResult);
      expect(assetsService.getParaId).toHaveBeenCalledWith(node);
    });
  });
});
