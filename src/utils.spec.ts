import { BadRequestException } from '@nestjs/common';
import { ApiPromise } from '@polkadot/api';
import { isNumeric, validateNode } from './utils';
import * as paraspellSdk from '@paraspell/sdk';

jest.mock('@polkadot/api', () => {
  const originalModule = jest.requireActual('@polkadot/api');

  const mockWsProvider = jest.fn().mockImplementation(() => ({
    isConnected: true,
    send: jest.fn(),
  }));

  const mockApiPromise = {
    ...originalModule.ApiPromise,
    create: jest.fn().mockResolvedValue({
      wsProvider: mockWsProvider,
    }),
  };

  return {
    ...originalModule,
    WsProvider: mockWsProvider,
    ApiPromise: mockApiPromise,
  };
});

describe('isNumeric', () => {
  it('should return true for numeric values', () => {
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('0')).toBe(true);
  });

  it('should return false for non-numeric values', () => {
    expect(isNumeric('abc')).toBe(false);
    expect(isNumeric('123abc')).toBe(false);
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric(NaN)).toBe(false);
    expect(isNumeric({})).toBe(false);
  });
});

describe('createApiInstance', () => {
  it('should create an ApiPromise instance', async () => {
    // Cast ApiPromise.create to a jest.Mock to use mockResolvedValue
    (ApiPromise.create as jest.Mock).mockResolvedValue({
      wsProvider: {
        isConnected: true,
        send: jest.fn(),
      },
    });

    const result = await paraspellSdk.createApiInstanceForNode('Polkadot');

    expect(ApiPromise.create).toHaveBeenCalledWith({
      provider: expect.any(Object),
    });
    expect(result).toEqual({
      wsProvider: expect.any(Object),
    });
  });
});

describe('validateNode', () => {
  it('should not throw for valid node', () => {
    expect(() => validateNode('Acala')).not.toThrow();
  });

  it('should throw BadRequestException for invalid node', () => {
    expect(() => validateNode('InvalidNode')).toThrow(BadRequestException);
  });
});
