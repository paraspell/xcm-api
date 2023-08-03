import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiPromise } from '@polkadot/api';
import {
  isNumeric,
  createApiInstance,
  findWsUrlByNode,
  validateNode,
  getNodeRelayChainWsUrl,
} from './utils';
import * as paraspellSdk from '@paraspell/sdk';
import { TNode } from '@paraspell/sdk';

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
    const wsUrl = 'wss://rpc.polkadot.io';

    // Cast ApiPromise.create to a jest.Mock to use mockResolvedValue
    (ApiPromise.create as jest.Mock).mockResolvedValue({
      wsProvider: {
        isConnected: true,
        send: jest.fn(),
      },
    });

    const result = await createApiInstance(wsUrl);

    expect(ApiPromise.create).toHaveBeenCalledWith({
      provider: expect.any(Object),
    });
    expect(result).toEqual({
      wsProvider: expect.any(Object),
    });
  });
});

describe('findWsUrlByNode', () => {
  it('should return the first provider WS URL for a valid node', () => {
    const node: TNode = 'Acala';
    const nodeInfo = {
      providers: { provider1: 'wss://provider1', provider2: 'wss://provider2' },
    };
    const getNodeEndpointOptionSpy = jest
      .spyOn(paraspellSdk, 'getNodeEndpointOption')
      .mockReturnValue(nodeInfo as any);

    const result = findWsUrlByNode(node);

    expect(getNodeEndpointOptionSpy).toHaveBeenCalledWith(node);
    expect(result).toBe('wss://provider1');
  });

  it('should throw InternalServerErrorException for node with no providers', () => {
    const node: TNode = 'Acala';
    const nodeInfo = { providers: {} };
    const getNodeEndpointOptionSpy = jest
      .spyOn(paraspellSdk, 'getNodeEndpointOption')
      .mockReturnValue(nodeInfo as any);

    expect(() => findWsUrlByNode(node)).toThrow(InternalServerErrorException);
    expect(getNodeEndpointOptionSpy).toHaveBeenCalledWith(node);
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

describe('getNodeRelayChainWsUrl', () => {
  it('should return POLKADOT_WS for DOT', () => {
    const symbol = 'DOT';
    const getRelayChainSymbolSpy = jest
      .spyOn(paraspellSdk, 'getRelayChainSymbol')
      .mockReturnValue(symbol);

    const result = getNodeRelayChainWsUrl('Acala');

    expect(getRelayChainSymbolSpy).toHaveBeenCalledWith('Acala');
    expect(result).toBe('wss://kusama-rpc.polkadot.io');
  });

  it('should return KUSAMA_WS for non-DOT symbol', () => {
    const symbol = 'KSM';
    const getRelayChainSymbolSpy = jest
      .spyOn(paraspellSdk, 'getRelayChainSymbol')
      .mockReturnValue(symbol);

    const result = getNodeRelayChainWsUrl('Acala');

    expect(getRelayChainSymbolSpy).toHaveBeenCalledWith('Acala');
    expect(result).toBe('wss://rpc.polkadot.io');
  });
});
