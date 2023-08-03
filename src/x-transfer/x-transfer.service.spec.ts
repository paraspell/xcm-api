import { Test, TestingModule } from '@nestjs/testing';
import { XTransferService } from './x-transfer.service';
import * as paraspellSdk from '@paraspell/sdk';
import { TNode, InvalidCurrencyError } from '@paraspell/sdk';
import { XTransferDto } from './dto/XTransferDto';
import * as utils from 'src/utils';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('XTransferService', () => {
  let service: XTransferService;
  let createApiInstanceSpy: jest.SpyInstance;
  let findWsUrlByNodeSpy: jest.SpyInstance;
  let getNodeRelayChainWsUrlSpy: jest.SpyInstance;

  const amount = 100;
  const address = '0x123';
  const currency = 'DOT';
  const wsUrl = 'wss://example.com';
  const relayChainWsUrl = 'wss://relaychain.com';
  const serializedApiCall = 'serialized-api-call';
  const invalidNode = 'InvalidNode';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XTransferService],
    }).compile();

    service = module.get<XTransferService>(XTransferService);
    createApiInstanceSpy = jest
      .spyOn(utils, 'createApiInstance')
      .mockResolvedValue({} as any);
    findWsUrlByNodeSpy = jest.spyOn(utils, 'findWsUrlByNode');
    getNodeRelayChainWsUrlSpy = jest.spyOn(utils, 'getNodeRelayChainWsUrl');
  });

  afterEach(() => {
    createApiInstanceSpy.mockRestore();
    findWsUrlByNodeSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateXcmCall', () => {
    it('should generate XCM call for parachain to parachain transfer', async () => {
      const from: TNode = 'Acala';
      const to: TNode = 'Basilisk';
      const xTransferDto: XTransferDto = {
        from,
        to,
        amount,
        address,
        currency,
      };
      findWsUrlByNodeSpy.mockReturnValue(wsUrl);

      const builderMock = {
        from: jest.fn().mockReturnThis(),
        to: jest.fn().mockReturnThis(),
        currency: jest.fn().mockReturnThis(),
        amount: jest.fn().mockReturnThis(),
        address: jest.fn().mockReturnThis(),
        buildSerializedApiCall: jest.fn().mockReturnValue(serializedApiCall),
      };
      jest.spyOn(paraspellSdk, 'Builder').mockReturnValue(builderMock as any);

      const result = await service.generateXcmCall(xTransferDto);

      expect(result).toBe(serializedApiCall);
      expect(createApiInstanceSpy).toHaveBeenCalledWith(wsUrl);
      expect(findWsUrlByNodeSpy).toHaveBeenCalled();
      expect(builderMock.from).toHaveBeenCalledWith(from);
      expect(builderMock.to).toHaveBeenCalledWith(to);
      expect(builderMock.currency).toHaveBeenCalledWith(currency);
      expect(builderMock.amount).toHaveBeenCalledWith(amount);
      expect(builderMock.address).toHaveBeenCalledWith(address);
      expect(builderMock.buildSerializedApiCall).toHaveBeenCalled();
    });

    it('should generate XCM call for parachain to relaychain transfer', async () => {
      const from: TNode = 'Acala';

      const xTransferDto: XTransferDto = {
        from,
        amount,
        address,
        currency,
      };
      findWsUrlByNodeSpy.mockReturnValue(wsUrl);

      const builderMock = {
        from: jest.fn().mockReturnThis(),
        amount: jest.fn().mockReturnThis(),
        address: jest.fn().mockReturnThis(),
        buildSerializedApiCall: jest.fn().mockReturnValue(serializedApiCall),
      };
      jest.spyOn(paraspellSdk, 'Builder').mockReturnValue(builderMock as any);

      const result = await service.generateXcmCall(xTransferDto);

      expect(result).toBe(serializedApiCall);
      expect(createApiInstanceSpy).toHaveBeenCalledWith(wsUrl);
      expect(findWsUrlByNodeSpy).toHaveBeenCalledWith(from);
      expect(builderMock.from).toHaveBeenCalledWith(from);
      expect(builderMock.amount).toHaveBeenCalledWith(amount);
      expect(builderMock.address).toHaveBeenCalledWith(address);
      expect(builderMock.buildSerializedApiCall).toHaveBeenCalled();
    });

    it('should generate XCM call for relaychain to parachain transfer', async () => {
      const to: TNode = 'Acala';
      const xTransferDto: XTransferDto = {
        to,
        amount,
        address,
      };
      findWsUrlByNodeSpy.mockReturnValue(wsUrl);
      getNodeRelayChainWsUrlSpy.mockReturnValue(relayChainWsUrl);

      const builderMock = {
        to: jest.fn().mockReturnThis(),
        amount: jest.fn().mockReturnThis(),
        address: jest.fn().mockReturnThis(),
        buildSerializedApiCall: jest.fn().mockReturnValue(serializedApiCall),
      };
      jest.spyOn(paraspellSdk, 'Builder').mockReturnValue(builderMock as any);

      const result = await service.generateXcmCall(xTransferDto);

      expect(result).toBe(serializedApiCall);
      expect(createApiInstanceSpy).toHaveBeenCalledWith(relayChainWsUrl);
      expect(findWsUrlByNodeSpy).not.toHaveBeenCalled();
      expect(getNodeRelayChainWsUrlSpy).toHaveBeenCalledWith(to);
      expect(builderMock.to).toHaveBeenCalledWith(to);
      expect(builderMock.amount).toHaveBeenCalledWith(amount);
      expect(builderMock.address).toHaveBeenCalledWith(address);
      expect(builderMock.buildSerializedApiCall).toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid from node', async () => {
      const xTransferDto: XTransferDto = {
        from: invalidNode,
        amount,
        address,
        currency,
      };

      await expect(service.generateXcmCall(xTransferDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(createApiInstanceSpy).not.toHaveBeenCalled();
      expect(findWsUrlByNodeSpy).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid to node', async () => {
      const xTransferDto: XTransferDto = {
        to: invalidNode,
        amount,
        address,
        currency,
      };

      await expect(service.generateXcmCall(xTransferDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(createApiInstanceSpy).not.toHaveBeenCalled();
      expect(findWsUrlByNodeSpy).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when from and to node are missing', async () => {
      const xTransferDto: XTransferDto = {
        amount,
        address,
        currency,
      };

      await expect(service.generateXcmCall(xTransferDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(createApiInstanceSpy).not.toHaveBeenCalled();
      expect(findWsUrlByNodeSpy).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for missing currency in parachain to parachain transfer', async () => {
      const xTransferDto: XTransferDto = {
        from: 'Acala',
        to: 'Basilisk',
        amount,
        address,
      };

      await expect(service.generateXcmCall(xTransferDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(createApiInstanceSpy).not.toHaveBeenCalled();
      expect(findWsUrlByNodeSpy).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid currency', async () => {
      const xTransferDto: XTransferDto = {
        from: 'Acala',
        to: 'Basilisk',
        amount,
        address,
        currency: 'UNKNOWN',
      };

      const builderMock = {
        from: jest.fn().mockReturnThis(),
        to: jest.fn().mockReturnThis(),
        currency: jest.fn().mockReturnThis(),
        amount: jest.fn().mockReturnThis(),
        address: jest.fn().mockReturnThis(),
        buildSerializedApiCall: jest.fn().mockImplementation(() => {
          throw new InvalidCurrencyError('');
        }),
      };
      jest.spyOn(paraspellSdk, 'Builder').mockReturnValue(builderMock as any);

      await expect(service.generateXcmCall(xTransferDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(createApiInstanceSpy).toHaveBeenCalled();
      expect(findWsUrlByNodeSpy).toHaveBeenCalled();
    });

    it('should throw InternalServerError when uknown error occures in the SDK', async () => {
      const xTransferDto: XTransferDto = {
        from: 'Acala',
        to: 'Basilisk',
        amount,
        address,
        currency,
      };

      const builderMock = {
        from: jest.fn().mockReturnThis(),
        to: jest.fn().mockReturnThis(),
        currency: jest.fn().mockReturnThis(),
        amount: jest.fn().mockReturnThis(),
        address: jest.fn().mockReturnThis(),
        buildSerializedApiCall: jest.fn().mockImplementation(() => {
          throw new Error('Unknown error');
        }),
      };
      jest.spyOn(paraspellSdk, 'Builder').mockReturnValue(builderMock as any);

      await expect(service.generateXcmCall(xTransferDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(createApiInstanceSpy).toHaveBeenCalled();
      expect(findWsUrlByNodeSpy).toHaveBeenCalled();
    });
  });
});
