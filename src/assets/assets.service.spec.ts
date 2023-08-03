import { Test, TestingModule } from '@nestjs/testing';
import { AssetsService } from './assets.service';
import * as paraspellSdk from '@paraspell/sdk';
import { TNode } from '@paraspell/sdk';
import * as utils from '../utils';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AssetsService', () => {
  let service: AssetsService;
  let validateNodeSpy: jest.SpyInstance;
  const node: TNode = 'Acala';
  const invalidNode = 'InvalidNode';
  const symbol = 'DOT';
  const unknownSymbol = 'UNKNOWN';
  const assetId = '1';
  const paraId = 2000;
  const decimals = 12;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetsService],
    }).compile();

    service = module.get<AssetsService>(AssetsService);

    validateNodeSpy = jest.spyOn(utils, 'validateNode');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNodeNames', () => {
    it('should return the list of node names', () => {
      const result = service.getNodeNames();
      expect(result).toEqual(paraspellSdk.NODE_NAMES);
    });
  });

  describe('getAssetsObject', () => {
    let getAssetsObjectSpy: jest.SpyInstance;

    beforeEach(() => {
      getAssetsObjectSpy = jest.spyOn(paraspellSdk, 'getAssetsObject');
    });

    afterEach(() => {
      getAssetsObjectSpy.mockRestore();
    });

    it('should return assets object for a valid node', () => {
      const assetsObject: paraspellSdk.TNodeAssets = {
        paraId,
        relayChainAssetSymbol: symbol,
        nativeAssets: [{ symbol, decimals }],
        otherAssets: [{ assetId, symbol: 'BSK', decimals }],
      };
      getAssetsObjectSpy.mockReturnValue(assetsObject);

      const result = service.getAssetsObject(node);
      expect(result).toEqual(assetsObject);
      expect(validateNodeSpy).toHaveBeenCalledWith(node);
      expect(getAssetsObjectSpy).toHaveBeenCalledWith(node);
    });

    it('should throw if node is invalid', () => {
      expect(() => service.getAssetsObject(invalidNode)).toThrow(
        BadRequestException,
      );

      expect(validateNodeSpy).toHaveBeenCalledWith(invalidNode);
      expect(getAssetsObjectSpy).not.toHaveBeenCalled();
    });
  });

  describe('getAssetId', () => {
    let getAssetIdSpy: jest.SpyInstance;

    beforeEach(async () => {
      getAssetIdSpy = jest.spyOn(paraspellSdk, 'getAssetId');
    });

    afterEach(() => {
      getAssetIdSpy.mockRestore();
    });

    it('should return asset ID for a valid node and symbol', () => {
      getAssetIdSpy.mockReturnValue(assetId);

      const result = service.getAssetId(node, symbol);

      expect(result).toEqual(assetId);
      expect(getAssetIdSpy).toHaveBeenCalledWith(node, symbol);
    });

    it('should throw NotFoundException for unknown symbol', () => {
      getAssetIdSpy.mockReturnValue(null);

      expect(() => service.getAssetId(node, unknownSymbol)).toThrow(
        NotFoundException,
      );
      expect(getAssetIdSpy).toHaveBeenCalledWith(node, unknownSymbol);
    });

    it('should throw BadRequestException for invalid node', () => {
      expect(() => service.getAssetId(invalidNode, symbol)).toThrow(
        BadRequestException,
      );
      expect(getAssetIdSpy).not.toHaveBeenCalled();
    });
  });

  describe('getRelayChainSymbol', () => {
    let getRelayChainSymbolSpy: jest.SpyInstance;

    beforeEach(async () => {
      getRelayChainSymbolSpy = jest.spyOn(paraspellSdk, 'getRelayChainSymbol');
    });

    afterEach(() => {
      getRelayChainSymbolSpy.mockRestore();
    });

    it('should return relay chain symbol for a valid node', () => {
      const relayChainSymbol = 'KSM';
      getRelayChainSymbolSpy.mockReturnValue(relayChainSymbol);

      const result = service.getRelayChainSymbol(node);

      expect(result).toEqual(JSON.stringify(relayChainSymbol));
      expect(getRelayChainSymbolSpy).toHaveBeenCalledWith(node);
    });

    it('should throw BadRequestException for invalid node', () => {
      expect(() => service.getRelayChainSymbol(invalidNode)).toThrow(
        BadRequestException,
      );
      expect(getRelayChainSymbolSpy).not.toHaveBeenCalled();
    });
  });

  describe('getNativeAssets', () => {
    let getNativeAssetsSpy: jest.SpyInstance;

    beforeEach(async () => {
      getNativeAssetsSpy = jest.spyOn(paraspellSdk, 'getNativeAssets');
    });

    afterEach(() => {
      getNativeAssetsSpy.mockRestore();
    });

    it('should return native assets for a valid node', () => {
      const nativeAssets = [{ symbol: 'KSM', decimals }];
      getNativeAssetsSpy.mockReturnValue(nativeAssets);

      const result = service.getNativeAssets(node);

      expect(result).toEqual(nativeAssets);
      expect(getNativeAssetsSpy).toHaveBeenCalledWith(node);
    });

    it('should throw BadRequestException for invalid node', () => {
      expect(() => service.getNativeAssets(invalidNode)).toThrow(
        BadRequestException,
      );
      expect(getNativeAssetsSpy).not.toHaveBeenCalled();
    });
  });

  describe('getOtherAssets', () => {
    let getOtherAssetsSpy: jest.SpyInstance;

    beforeEach(async () => {
      getOtherAssetsSpy = jest.spyOn(paraspellSdk, 'getOtherAssets');
    });

    afterEach(() => {
      getOtherAssetsSpy.mockRestore();
    });

    it('should return other assets for a valid node', () => {
      const otherAssets = [{ assetId, symbol: 'BSK', decimals }];
      getOtherAssetsSpy.mockReturnValue(otherAssets);

      const result = service.getOtherAssets(node);

      expect(result).toEqual(otherAssets);
      expect(getOtherAssetsSpy).toHaveBeenCalledWith(node);
    });

    it('should throw BadRequestException for invalid node', () => {
      expect(() => service.getOtherAssets(invalidNode)).toThrow(
        BadRequestException,
      );
      expect(getOtherAssetsSpy).not.toHaveBeenCalled();
    });
  });

  describe('getAllAssetsSymbols', () => {
    let getAllAssetsSymbolsSpy: jest.SpyInstance;

    beforeEach(async () => {
      getAllAssetsSymbolsSpy = jest.spyOn(paraspellSdk, 'getAllAssetsSymbols');
    });

    afterEach(() => {
      getAllAssetsSymbolsSpy.mockRestore();
    });

    it('should return all assets symbols for a valid node', () => {
      const allAssetSymbols = ['KSM', 'DOT'];
      getAllAssetsSymbolsSpy.mockReturnValue(allAssetSymbols);

      const result = service.getAllAssetsSymbols(node);

      expect(result).toEqual(allAssetSymbols);
      expect(getAllAssetsSymbolsSpy).toHaveBeenCalledWith(node);
    });

    it('should throw BadRequestException for invalid node', () => {
      expect(() => service.getAllAssetsSymbols(invalidNode)).toThrow(
        BadRequestException,
      );
      expect(getAllAssetsSymbolsSpy).not.toHaveBeenCalled();
    });
  });

  describe('getDecimals', () => {
    let getAssetDecimalsSpy: jest.SpyInstance;

    beforeEach(async () => {
      getAssetDecimalsSpy = jest.spyOn(paraspellSdk, 'getAssetDecimals');
    });

    afterEach(() => {
      getAssetDecimalsSpy.mockRestore();
    });

    it('should return asset decimals for a valid node and symbol', () => {
      const node = 'Acala';
      const symbol = 'DOT';
      const decimals = 18;
      getAssetDecimalsSpy.mockReturnValue(decimals);

      const result = service.getDecimals(node, symbol);

      expect(result).toEqual(decimals);
      expect(getAssetDecimalsSpy).toHaveBeenCalledWith(node, symbol);
    });

    it('should throw NotFoundException for unknown symbol', () => {
      getAssetDecimalsSpy.mockReturnValue(null);

      expect(() => service.getDecimals(node, unknownSymbol)).toThrow(
        NotFoundException,
      );
      expect(getAssetDecimalsSpy).toHaveBeenCalledWith(node, unknownSymbol);
    });

    it('should throw BadRequestException for invalid node', () => {
      expect(() => service.getDecimals(invalidNode, symbol)).toThrow(
        BadRequestException,
      );
      expect(getAssetDecimalsSpy).not.toHaveBeenCalled();
    });
  });

  describe('hasSupportForAsset', () => {
    let hasSupportForAssetSpy: jest.SpyInstance;

    beforeEach(async () => {
      hasSupportForAssetSpy = jest.spyOn(paraspellSdk, 'hasSupportForAsset');
    });

    afterEach(() => {
      hasSupportForAssetSpy.mockRestore();
    });

    it('should return true if asset is supported for a valid node and symbol', () => {
      hasSupportForAssetSpy.mockReturnValue(true);

      const result = service.hasSupportForAsset(node, symbol);

      expect(result).toEqual(true);
      expect(hasSupportForAssetSpy).toHaveBeenCalledWith(node, symbol);
    });

    it('should return false if asset is not supported for a valid node and symbol', () => {
      hasSupportForAssetSpy.mockReturnValue(false);

      const result = service.hasSupportForAsset(node, unknownSymbol);

      expect(result).toEqual(false);
      expect(hasSupportForAssetSpy).toHaveBeenCalledWith(node, unknownSymbol);
    });

    it('should throw BadRequestException for invalid node', () => {
      expect(() => service.hasSupportForAsset(invalidNode, symbol)).toThrow(
        BadRequestException,
      );
      expect(hasSupportForAssetSpy).not.toHaveBeenCalled();
    });
  });

  describe('AssetsService', () => {
    let getParaIdSpy: jest.SpyInstance;

    beforeEach(async () => {
      getParaIdSpy = jest.spyOn(paraspellSdk, 'getParaId');
    });

    afterEach(() => {
      getParaIdSpy.mockRestore();
    });

    describe('getParaId', () => {
      it('should return parachain ID for a valid node', () => {
        const result = service.getParaId(node);

        expect(result).toEqual(paraId);
        expect(getParaIdSpy).toHaveBeenCalledWith(node);
      });

      it('should throw BadRequestException for invalid node', () => {
        expect(() => service.getParaId(invalidNode)).toThrow(
          BadRequestException,
        );
        expect(getParaIdSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('getNodeByParaId', () => {
    let getTNodeSpy: jest.SpyInstance;

    beforeEach(async () => {
      getTNodeSpy = jest.spyOn(paraspellSdk, 'getTNode');
    });

    afterEach(() => {
      getTNodeSpy.mockRestore();
    });

    it('should return node by parachain ID', () => {
      const result = service.getNodeByParaId(paraId);

      expect(result).toEqual(JSON.stringify(node));
      expect(getTNodeSpy).toHaveBeenCalledWith(paraId);
    });

    it('should throw NotFoundException for unknown parachain ID', () => {
      const unknownParaId = 999;

      expect(() => service.getNodeByParaId(unknownParaId)).toThrow(
        NotFoundException,
      );
      expect(getTNodeSpy).toHaveBeenCalledWith(unknownParaId);
    });
  });
});
