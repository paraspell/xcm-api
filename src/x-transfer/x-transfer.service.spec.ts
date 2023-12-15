import { Test, TestingModule } from '@nestjs/testing';
import { XTransferService } from './x-transfer.service';
import * as paraspellSdk from '@paraspell/sdk';
import { TNode, InvalidCurrencyError } from '@paraspell/sdk';
import { XTransferDto } from './dto/XTransferDto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('XTransferService', () => {
  let service: XTransferService;
  let createApiInstanceForNodeSpy: jest.SpyInstance;

  const amount = 100;
  const address = '5F5586mfsnM6durWRLptYt3jSUs55KEmahdodQ5tQMr9iY96';
  const currency = 'DOT';
  const serializedApiCall = 'serialized-api-call';
  const invalidNode = 'InvalidNode';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XTransferService],
    }).compile();

    service = module.get<XTransferService>(XTransferService);
    createApiInstanceForNodeSpy = jest
      .spyOn(paraspellSdk, 'createApiInstanceForNode')
      .mockResolvedValue(null as any);
  });

  afterEach(() => {
    createApiInstanceForNodeSpy.mockRestore();
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
      expect(createApiInstanceForNodeSpy).toHaveBeenCalledWith(from);
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

      const builderMock = {
        from: jest.fn().mockReturnThis(),
        amount: jest.fn().mockReturnThis(),
        address: jest.fn().mockReturnThis(),
        buildSerializedApiCall: jest.fn().mockReturnValue(serializedApiCall),
      };
      jest.spyOn(paraspellSdk, 'Builder').mockReturnValue(builderMock as any);

      const result = await service.generateXcmCall(xTransferDto);

      expect(result).toBe(serializedApiCall);
      expect(createApiInstanceForNodeSpy).toHaveBeenCalledWith(from);
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

      const builderMock = {
        to: jest.fn().mockReturnThis(),
        amount: jest.fn().mockReturnThis(),
        address: jest.fn().mockReturnThis(),
        buildSerializedApiCall: jest.fn().mockReturnValue(serializedApiCall),
      };
      jest.spyOn(paraspellSdk, 'Builder').mockReturnValue(builderMock as any);

      const result = await service.generateXcmCall(xTransferDto);

      expect(result).toBe(serializedApiCall);
      expect(createApiInstanceForNodeSpy).toHaveBeenCalledWith(to);
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
      expect(createApiInstanceForNodeSpy).not.toHaveBeenCalled();
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
      expect(createApiInstanceForNodeSpy).not.toHaveBeenCalled();
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
      expect(createApiInstanceForNodeSpy).not.toHaveBeenCalled();
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
      expect(createApiInstanceForNodeSpy).not.toHaveBeenCalled();
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
      expect(createApiInstanceForNodeSpy).toHaveBeenCalled();
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
      expect(createApiInstanceForNodeSpy).toHaveBeenCalled();
    });
  });
});
