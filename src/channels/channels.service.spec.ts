import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService } from './channels.service';
import { BadRequestException } from '@nestjs/common';
import * as paraspellSdk from '@paraspell/sdk';
import { TNode } from '@paraspell/sdk';

describe('ChannelsService', () => {
  let service: ChannelsService;
  const maxSize = '512';
  const maxMessageSize = '512';
  const inbound = '50';
  const outbound = '40';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelsService],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('openChannel', () => {
    it('should open a channel with valid parameters', async () => {
      const from: TNode = 'Acala';
      const to: TNode = 'Basilisk';

      const mockOpenChannelDto = {
        from,
        to,
        maxSize,
        maxMessageSize,
      };

      // Mock the relevant builder interfaces
      const mockBuilder = {
        from: jest.fn().mockReturnThis(),
        to: jest.fn().mockReturnThis(),
        openChannel: jest.fn().mockReturnThis(),
        maxSize: jest.fn().mockReturnThis(),
        maxMessageSize: jest.fn().mockReturnThis(),
        buildSerializedApiCall: jest
          .fn()
          .mockReturnValue('serialized-api-call'),
      };
      const builderSpy = jest
        .spyOn(paraspellSdk, 'Builder')
        .mockReturnValue(mockBuilder as any);

      const result = await service.openChannel(mockOpenChannelDto);

      expect(result).toBe('serialized-api-call');
      expect(builderSpy).toHaveBeenCalledWith(null); // Check if Builder is called with the expected parameter
      expect(mockBuilder.from).toHaveBeenCalledWith(from);
      expect(mockBuilder.to).toHaveBeenCalledWith(to);
      expect(mockBuilder.maxSize).toHaveBeenCalledWith(Number(maxSize));
      expect(mockBuilder.maxMessageSize).toHaveBeenCalledWith(
        Number(maxMessageSize),
      );
    });

    it('should throw BadRequestException for invalid from node', async () => {
      const from = 'InvalidNode';
      const to: TNode = 'Basilisk';
      const mockOpenChannelDto = {
        from,
        to,
        maxSize,
        maxMessageSize,
      };

      await expect(service.openChannel(mockOpenChannelDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for invalid to node', async () => {
      const from: TNode = 'Basilisk';
      const to = 'InvalidNode';
      const mockOpenChannelDto = {
        from,
        to,
        maxSize,
        maxMessageSize,
      };

      await expect(service.openChannel(mockOpenChannelDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('closeChannel', () => {
    it('should close a channel with valid parameters', async () => {
      const from: TNode = 'Acala';

      const mockCloseChannelDto = {
        from,
        inbound,
        outbound,
      };

      const mockBuilder = {
        from: jest.fn().mockReturnThis(),
        inbound: jest.fn().mockReturnThis(),
        outbound: jest.fn().mockReturnThis(),
        closeChannel: jest.fn().mockReturnThis(),
        buildSerializedApiCall: jest
          .fn()
          .mockReturnValue('serialized-api-call'),
      };

      const builderSpy = jest
        .spyOn(paraspellSdk, 'Builder')
        .mockReturnValue(mockBuilder as any);

      const result = await service.closeChannel(mockCloseChannelDto);

      expect(result).toBe('serialized-api-call');
      expect(builderSpy).toHaveBeenCalledWith(null);
      expect(mockBuilder.from).toHaveBeenCalledWith(from);
      expect(mockBuilder.inbound).toHaveBeenCalledWith(Number(inbound));
      expect(mockBuilder.outbound).toHaveBeenCalledWith(Number(outbound));
    });

    it('should throw BadRequestException for invalid nodes', async () => {
      const from = 'InvalidNode';
      const mockCloseChannelDto = {
        from,
        inbound,
        outbound,
      };

      await expect(service.closeChannel(mockCloseChannelDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
