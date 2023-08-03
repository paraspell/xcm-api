import { Test, TestingModule } from '@nestjs/testing';
import { PalletsService } from './pallets.service';
import { TNode, TPallet } from '@paraspell/sdk';
import * as paraspellSdk from '@paraspell/sdk';
import * as utils from '../utils';

describe('PalletsService', () => {
  let service: PalletsService;
  let validateNodeSpy: jest.SpyInstance;
  let getDefaultPalletSpy: jest.SpyInstance;
  let getSupportedPalletsSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PalletsService],
    }).compile();

    service = module.get<PalletsService>(PalletsService);
    validateNodeSpy = jest.spyOn(utils, 'validateNode');
    getDefaultPalletSpy = jest.spyOn(paraspellSdk, 'getDefaultPallet');
    getSupportedPalletsSpy = jest.spyOn(paraspellSdk, 'getSupportedPallets');
  });

  afterEach(() => {
    validateNodeSpy.mockRestore();
    getDefaultPalletSpy.mockRestore();
    getSupportedPalletsSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDefaultPallet', () => {
    it('should return the default pallet as string', () => {
      const mockNode: TNode = 'Acala';
      const mockPallet: TPallet = 'PolkadotXcm';
      getDefaultPalletSpy.mockReturnValue(mockPallet);

      const result = service.getDefaultPallet(mockNode);

      expect(validateNodeSpy).toHaveBeenCalledWith(mockNode);
      expect(getDefaultPalletSpy).toHaveBeenCalledWith(mockNode);
      expect(result).toEqual(JSON.stringify(mockPallet));
    });
  });

  describe('getPallets', () => {
    it('should return supported pallets array', () => {
      const mockNode: TNode = 'Acala';
      const mockPallets: TPallet[] = ['OrmlXTokens', 'RelayerXcm'];
      getSupportedPalletsSpy.mockReturnValue(mockPallets);

      const result = service.getPallets(mockNode);

      expect(validateNodeSpy).toHaveBeenCalledWith(mockNode);
      expect(getSupportedPalletsSpy).toHaveBeenCalledWith(mockNode);
      expect(result).toEqual(mockPallets);
    });
  });
});
